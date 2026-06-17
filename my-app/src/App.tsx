
import './App.css'
import {SoundButton } from './AudioComponent'
import boopSfx from '../sounds/Grumpy ghost.m4a';
import React from 'react';
import { Quiz, type Question } from './QuizComponent';
import { useTranslation } from 'react-i18next';

const myQuestions: Question[] = [
  {
    id: 1,
    questionTextKey: "quizQuestions.1.question",
    QuestionUrl: boopSfx,
    optionKeys: [
      "quizQuestions.1.options.0",
      "quizQuestions.1.options.1",
      "quizQuestions.1.options.2",
      "quizQuestions.1.options.3"
    ],
    correctAnswerKey: "quizQuestions.1.options.0"
  }
];



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
  const { t, i18n } = useTranslation();
  
  const handleQuizComplete = (finalScore: number) => {
    console.log(`Quiz Done! Total Score: ${finalScore}`);
  };

  return (
    <div className="app">

      <Header></Header>
      <h1>{t("title")}</h1>
      <Quiz questions={myQuestions} onQuizComplete={handleQuizComplete} />
    </div>
  );
};

export default App;

// function App() {


//   return (
//     <>
//     <div>
//       <SoundButton soundUrl={boopSfx} buttonText="Klik her" />
//       <Quiz questions={[]} onQuizComplete={function (score: number): void {
//           throw new Error('Function not implemented.');
//         } }></Quiz>
//       </div>
//     </>
//   )
// }

// export default App
