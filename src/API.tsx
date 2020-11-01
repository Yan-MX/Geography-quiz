import { ShuffleArray } from "./utils";
export enum Difficulty {
  Easy = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type Question = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Question & { answers: string[] };

export const fetchQuiz = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=22&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: ShuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
