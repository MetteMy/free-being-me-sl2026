import { useEffect, useState } from 'react';
import './App.css'

import boopSfx from '../sounds/Grumpy ghost.m4a';

import { Quiz, type Question } from './QuizComponent';
import { useTranslation } from 'react-i18next';

type QuizId = 'signup' | 'dropin';
type ScoutSize = 'big' | 'small';

// Builds one question whose text/options are looked up under the given
// translation prefix, e.g. "signupQuestions.big" -> "signupQuestions.big.1.question".
const buildQuestion = (prefix: string): Question => ({
  id: 1,
  questionTextKey: `${prefix}.1.question`,
  QuestionUrl: boopSfx,
  optionKeys: [
    `${prefix}.1.options.0`,
    `${prefix}.1.options.1`,
    `${prefix}.1.options.2`,
    `${prefix}.1.options.3`,
  ],
  correctAnswerKey: `${prefix}.1.options.0`,
});

// Questions per quiz, split by scout size.
const questionSets: Record<QuizId, Record<ScoutSize, Question[]>> = {
  signup: {
    big: [buildQuestion("signupQuestions.big")],
    small: [buildQuestion("signupQuestions.small")],
  },
  dropin: {
    big: [buildQuestion("dropinQuestions.big")],
    small: [buildQuestion("dropinQuestions.small")],
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
