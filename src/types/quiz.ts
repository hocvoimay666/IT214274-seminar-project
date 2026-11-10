// Quiz and question models
export type QuestionType = 'multiple-choice' | 'fill-blank';

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  type?: QuestionType;
};

export type QuizResult = {
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  completedAt?: string;
};
