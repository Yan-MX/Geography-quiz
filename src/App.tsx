import React, { useState } from "react";
import QestionCard from "./component/QuestionCard";
import { fetchQuiz, Difficulty, QuestionState } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";
function App() {
  const totalQuestion = 10;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuiz(totalQuestion, Difficulty.Easy);
    setQuestions(newQuestions);
    console.log(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answerfromUser = e.currentTarget.value;
      const correct = questions[number].correct_answer === answerfromUser;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer: answerfromUser,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const next = number + 1;
    if (next === totalQuestion) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Geography Quiz</h1>
        {gameOver || userAnswer.length === totalQuestion ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score:{score}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !gameOver && (
          <QestionCard
            questionNr={number + 1}
            totalQuestion={totalQuestion}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== totalQuestion ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
