import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SoundButton } from "./AudioComponent";
import { selectButton } from "./selectButton";

// Data Interfaces
export interface Question {
  id: number;
  questionTextKey: string;
  QuestionUrl: string;
  optionKeys: string[];
  correctAnswerKey: string;
}

interface QuizProps {
  questions: Question[];
  onQuizComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onQuizComplete }) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showResult, setShowResult] = useState(false);

  //   const [timer, setTimer] = useState<number>(15);

  const currentQuestion = questions[currentIndex];

  // const handleSelectOption = (option: string) => {
  //   setSelectedOption(option);
  // };

  const handleSubmit = () => {
    setShowResult(true);

    if (selectedOption === currentQuestion.correctAnswerKey) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNext();
      setShowResult(false);
    }, 1200);
  };
  const handleNext = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      onQuizComplete(score);
    }
  };

  if (isFinished) {
    return (
      <div className="quiz-container">
        <h2>{t("quiz.quizFinished")}</h2>
        <p>
          {t("quiz.finalScore", {
            score,
            total: questions.length,
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>
          {t("quiz.questionProgress", {
            current: currentIndex + 1,
            total: questions.length,
          })}
        </span>
      </div>

      <h2>{t(currentQuestion.questionTextKey)}</h2>

      <SoundButton
        soundUrl={currentQuestion?.QuestionUrl}
        // buttonText={t("quiz.playSound")}
      />

      <div className={`options-container ${showResult ? "submitted" : ""}`}>
        {currentQuestion.optionKeys.map((optionKey) => {
          const isCorrect = optionKey === currentQuestion.correctAnswerKey;
          const isSelected = optionKey === selectedOption;

          return (
            <label
              key={optionKey}
              className={`option-label
          ${showResult && isCorrect ? "correct" : ""}
          ${showResult && isSelected && !isCorrect ? "wrong" : ""}
          ${selectedOption === optionKey ? "selected" : ""}
        `}
            >
              <input
                type="radio"
                name="answer"
                value={optionKey}
                checked={selectedOption === optionKey}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span>{t(optionKey)}</span>
            </label>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="button--yellow"
      >
        {currentIndex === questions.length - 1
          ? t("quiz.finish")
          : t("quiz.next")}
      </button>
    </div>
  );
};
