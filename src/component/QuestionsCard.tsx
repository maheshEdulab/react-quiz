import React from 'react'
import { AnswerObject } from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalquestions: number
}

const QuestionsCard: React.FC<Props> =
    ({ question,
        answers,
        callback,
        userAnswer,
        questionNr,
        totalquestions
    }) => (

        <div className='mx-20 my-5'>
            <p className="number my-5 font-semibold text-2xl">
                Question:{questionNr}/{totalquestions}
            </p>
            <p className='font-serif font-bold underline underline-offset-8' dangerouslySetInnerHTML={{ __html: question }}></p>
            <div className='my-5'>
                {
                    answers.map(answer => (
                        <div key={answer}>
                            <button className='border-2 border-black rounded-md w-80 my-1.5 font-serif blur-none shadow-lg hover:bg-slate-200 cursor-pointer  focus:ring-sky-500 disabled:text-slate-500 disabled:border-slate-200 disabled:hover:bg-red-400 invalid:border-pink-500' disabled={!!userAnswer} value={answer} id={question} onClick={callback}>
                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )

export default QuestionsCard;