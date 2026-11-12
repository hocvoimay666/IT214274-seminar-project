// User learning progress & statistics models



export type WrongAnswerRecord = {

  id: string;
  lessonId: string;
  questionId: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
  attempts: number;
  lastAttemptAt: string;

};



export type QuizAttempt = {

  id: string;
  lessonId?: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  completedAt: string;

};



export type LearningProgress = {

  completedLessonIds: string[];
  completedQuizzes: number;
  correctAnswers: number;

  // Additional statistics
  totalQuestions?: number;
  averageScore?: number;
  quizHistory?: QuizAttempt[];
  wrongAnswers?: WrongAnswerRecord[];
  // Day-based streak
  streakDays: number;
  lastActiveDate?: string; // ISO date "YYYY-MM-DD"

  streakDays?: number;
  
  lastActiveDate?: string;
};