
import './App.css'
import {SoundButton } from './AudioComponent'
import boopSfx from '../sounds/Grumpy ghost.m4a';


import React from 'react';
import { Quiz, type Question } from './QuizComponent';
import { useTranslation } from 'react-i18next';

const myQuestions: Question[] = [
  {
    id: 1,
    questionText: "Which hook is used to handle state in React?",
    QuestionUrl: boopSfx,
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useState"
  },
  // Add more questions here...
];

export function LanguageChanger() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
    
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("da")}>Danish</button>
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

      <LanguageChanger></LanguageChanger>
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
