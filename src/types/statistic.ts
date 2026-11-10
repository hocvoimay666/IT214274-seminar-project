// User learning progress & stats model
export type LearningProgress = {
  completedLessonIds: string[];
  completedQuizzes: number;
  correctAnswers: number;
  averageScore?: number;
};
