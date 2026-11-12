// Quiz and question models
export type QuizQuestion =
  | { id: string; prompt: string; type: 'multiple-choice'; options: string[]; answer: string }
  | { id: string; prompt: string; type: 'fill-blank'; answer: string }
  | { id: string; prompt: string; type: 'true-false'; answer: 'true' | 'false' };

export type QuestionType = QuizQuestion['type'];

export type QuizResult = {
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  completedAt?: string;
};
