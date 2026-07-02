import { useEffect, useState } from 'react';
import './App.css'

import boopSfx from '../sounds/Grumpy ghost.m4a';
import screamSfx from '../sounds/Skrig.m4a';
import crowSfx from '../sounds/719361__larsnwav__crow-ambience.wav';
import water from '../sounds/257957__fillsoko__pouring-water-into-glass.wav'
import chips from '../sounds/651303__sadisticu__eating-chips.wav'
import cow from '../sounds/513565__spurioustransients__cow-moo-8.wav'
import popcorn from '../sounds/91262__kevinflo__popcorn-real.wav'
import violin from '../sounds/159163__cms4f__violin-in-the-hotel.wav'
import toilet from '../sounds/404329__inspectorj__toilet-flush-european-distant-lid-up.wav'
import mixer from '../sounds/90786__kmoon__mixer_pot_motor.wav'


import { Quiz, type Question } from './QuizComponent';
import { useTranslation } from 'react-i18next';

type QuizId = 'signup' | 'dropin';
type ScoutSize = 'big' | 'small';


// correctIndex is the 0-based position of the correct option (0 = first option).
const buildQuestion = (
  prefix: string,
  num: number,
  sound: string,
  correctIndex = 0
): Question => ({
  id: num,
  questionTextKey: `${prefix}.${num}.question`,
  QuestionUrl: sound,
  optionKeys: [
    `${prefix}.${num}.options.0`,
    `${prefix}.${num}.options.1`,
    `${prefix}.${num}.options.2`,
    `${prefix}.${num}.options.3`,
  ],
  correctAnswerKey: `${prefix}.${num}.options.${correctIndex}`,
});


const questionSets: Record<QuizId, Record<ScoutSize, Question[]>> = {
  signup: {
    big: [
      buildQuestion("signupQuestions.big", 1, boopSfx),
      buildQuestion("signupQuestions.big", 2, screamSfx),
    ],
    small: [
      buildQuestion("signupQuestions.small", 1, screamSfx),
      buildQuestion("signupQuestions.small", 2, crowSfx),
    ],
  },
  dropin: {
    big: [
      buildQuestion("dropinQuestions.big", 1, crowSfx, 0),
      buildQuestion("dropinQuestions.big", 2, water, 2),
      buildQuestion("dropinQuestions.big", 3, cow, 1),
      buildQuestion("dropinQuestions.big", 4, chips, 0),
      buildQuestion("dropinQuestions.big", 5, popcorn, 3),
      buildQuestion("dropinQuestions.big", 6, violin, 2),
      buildQuestion("dropinQuestions.big", 7, mixer, 1),
      buildQuestion("dropinQuestions.big", 8, toilet, 0),
    ],
    small: [
      buildQuestion("dropinQuestions.small", 1, crowSfx, 0),
      buildQuestion("dropinQuestions.small", 2, water, 2),
      buildQuestion("dropinQuestions.small", 3, cow, 1),
      buildQuestion("dropinQuestions.small", 4, chips, 0),
      buildQuestion("dropinQuestions.small", 5, popcorn, 3),
      buildQuestion("dropinQuestions.small", 6, violin, 2),
      buildQuestion("dropinQuestions.small", 7, mixer, 1),
      buildQuestion("dropinQuestions.small", 8, toilet, 0),
    ],
  },
};

// Reads the quiz to show from the URL hash, e.g. ".../#signup" or ".../#dropin".
const getQuizFromHash = (): QuizId | null => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash === "signup" || hash === "dropin" ? hash : null;
};



export function LanguageChanger() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>

      <button
        className={`lang-btn ${i18n.language === "da" ? "active" : ""}`}
        onClick={() => changeLanguage("da")}
      >
        DA
      </button>
    </div>
  );
}

export function Header() {
  return (
    <div className="header">
      <LanguageChanger />
    </div>
  );
}

const App = () => {
  const { t } = useTranslation();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizId | null>(getQuizFromHash);
  const [scoutSize, setScoutSize] = useState<ScoutSize | null>(null);

  // Keep the quiz in sync if the URL hash changes (e.g. scanning the other QR code).
  useEffect(() => {
    const onHashChange = () => {
      setSelectedQuiz(getQuizFromHash());
      setScoutSize(null); // new quiz -> ask for scout size again
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleQuizComplete = (finalScore: number) => {
    console.log(`Quiz Done! (${selectedQuiz}, ${scoutSize}) Total Score: ${finalScore}`);
  };

  const renderContent = () => {
    if (selectedQuiz === null) {
      return <p>{t("menu.chooseQuiz")}</p>;
    }

    if (scoutSize === null) {
      return (
        <div className="scout-select">
          <h2>{t("scout.choose")}</h2>
          <div className="scout-select-buttons">
            <button
              className="button--yellow"
              onClick={() => setScoutSize("big")}
            >
              {t("scout.big")}
            </button>
            
            <button
              className="button--yellow"
              onClick={() => setScoutSize("small")}
            >
              {t("scout.small")}
            </button>
          </div>
        </div>
      );
    }

    return (
      <Quiz
        key={`${selectedQuiz}-${scoutSize}`}
        questions={questionSets[selectedQuiz][scoutSize]}
        onQuizComplete={handleQuizComplete}
      />
    );
  };

  return (
    <div className="app">

      <Header></Header>
      <h1>{t("title")}</h1>

      {renderContent()}
    </div>
  );
};

export default App;
