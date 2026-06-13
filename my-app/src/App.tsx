
import './App.css'
import {SoundButton } from './AudioComponent'
import boopSfx from '../sounds/Grumpy ghost.m4a';


import React from 'react';
import { Quiz, type Question } from './QuizComponent';

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

const App = () => {
  const handleQuizComplete = (finalScore: number) => {
    console.log(`Quiz Done! Total Score: ${finalScore}`);
  };

  return (
    <div className="app">
      <h1>Quiz</h1>
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
