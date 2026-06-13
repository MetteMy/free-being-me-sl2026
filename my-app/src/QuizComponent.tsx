import React, { useState, useEffect } from 'react';
import { SoundButton } from './AudioComponent';

// Data Interfaces
export interface Question {
  id: number;
  questionText: string;
  QuestionUrl: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: Question[];
  onQuizComplete: (score: number) => void;
}


export const Quiz: React.FC<QuizProps> = ({ questions, onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(15);

  const currentQuestion = questions[currentIndex];

  // Timer logic for each question
//   useEffect(() => {
//     if (timer === 0) {
//       handleNext();
//     }
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
    //   setTimer(15); // Reset timer for the next question
    } else {
      setIsFinished(true);
      onQuizComplete(score);
    }
  };

  if (isFinished) {
    return (
      <div className="quiz-container">
        <h2>Quiz Finished!</h2>
        <p>Your Final Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        {/* <span className="timer">Time Left: {timer}s</span> */}
      </div>

      <h2 className="question-text">{currentQuestion?.questionText}</h2>
        <SoundButton soundUrl={currentQuestion?.QuestionUrl} buttonText={'Play sound'} ></SoundButton>
      <div className="options-container">
        {currentQuestion?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectOption(option)}
            className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="submit-btn"
      >
        {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};
