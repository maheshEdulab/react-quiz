import axios from 'axios';
import { suffulArray } from './utils';

import React from 'react'

export type Question = {
    category: string;
    correct_answer: string
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}
export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy",
    MIDIUM = "midium",
    HARD = "hard"
}


export const axiosquizQuestion = async (amount: number, difficulty: Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const { data } = await axios.get(endPoint);
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: suffulArray([...question.incorrect_answers, question.correct_answer]),
        }
    ))

}
