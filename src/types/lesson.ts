import type { QuizQuestion } from '@/types/quiz';

export type VocabularyWord = {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  image?: string;
};

export type GrammarItem = {
  title: string;
  explanation: string;
  example: string;
};

export type Lesson = {
  id: string;
  title: string;
  level: string;
  description: string;
  vocabulary: VocabularyWord[];
  grammar?: GrammarItem[];
  questions: QuizQuestion[];
};

// Re-export types for backward compatibility
export type { QuizQuestion } from '@/types/quiz';
export type { LearningProgress } from '@/types/statistic';
