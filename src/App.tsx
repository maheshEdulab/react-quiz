import React, { useState } from 'react';
import QuestionsCard from './component/QuestionsCard';
import { axiosquizQuestion } from './API';
import { QuestionState, Difficulty } from './API'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
const Total_Question = 15;
function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(axiosquizQuestion(10, Difficulty.EASY))

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const nextQuestions = await axiosquizQuestion(Total_Question, Difficulty.EASY);

    setQuestions(nextQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      console.log(answer)
      const corrrect = questions[number].correct_answer === answer
      console.log(corrrect)
      if (corrrect) setScore(score + 1)
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: corrrect,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswer([...userAnswer, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === Total_Question) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }


  return (



    <div className=" mx-16 my-20" >
      <h1 className='text-3xl font-semibold underline decoration-red-500'>React Quiz</h1>
      {gameOver || userAnswer.length === Total_Question ? (<button className='border-2 border-black rounded-md w-20 mx-16 bg-green-400 text-black my-5' onClick={startTrivia}>Start:</button>) : null}

      {!gameOver ? <button className=' text-2xl my-10'>Score:{score}</button> : null}
      {loading && <h3 className='text-xl'>Loading question...</h3>}
      {!loading && !gameOver && (
        <QuestionsCard
          questionNr={number + 1}
          totalquestions={Total_Question}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />)}
      <hr className='border border-5 max-w-screen-md' />
      {!loading
        && !gameOver
        && userAnswer[number]
        && number !== Total_Question - 1 ?
        <button className='border-2 border-black rounded-md w-40 mx-20 my-5 font-serif shadow-2xl hover:bg-purple-200 cursor-pointer' onClick={nextQuestion}>Next Question</button> : null}
    </div>
  );
}

export default App;
