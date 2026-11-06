export type VocabularyWord = { word: string; pronunciation: string; meaning: string; example: string };
export type QuizQuestion = { id: string; prompt: string; options: string[]; answer: string };
export type Lesson = {
  id: string;
  title: string;
  level: string;
  description: string;
  vocabulary: VocabularyWord[];
  questions: QuizQuestion[];
};

export type LearningProgress = { completedLessonIds: string[]; completedQuizzes: number; correctAnswers: number };
