import AsyncStorage from '@react-native-async-storage/async-storage';

import { PROGRESS_STORAGE_KEY } from '@/constants/constants';
import type { LearningProgress, QuizAttempt, WrongAnswerRecord } from '@/types/statistic';

const EMPTY_PROGRESS: LearningProgress = { 
  completedLessonIds: [], 
  completedQuizzes: 0, 
  correctAnswers: 0,
  totalQuestions: 0,
  averageScore: 0,
  quizHistory: [],
  wrongAnswers: []
};

// Read progress from device storage
export async function getProgress(): Promise<LearningProgress> {
  const raw = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!raw) return EMPTY_PROGRESS;
  try {
    const parsed = JSON.parse(raw);
    return { ...EMPTY_PROGRESS, ...parsed } as LearningProgress;
  } catch {
    return EMPTY_PROGRESS;
  }
}

// Save progress back to AsyncStorage
export async function saveProgress(progress: LearningProgress) {
  await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

// Mark a lesson as finished
export async function markLessonComplete(lessonId: string) {
  const progress = await getProgress();
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
    await saveProgress(progress);
  }
  return progress;
}

// Save detailed quiz result, update statistics, history and wrong answers
export async function saveQuizResultDetailed(
  lessonId: string | undefined,
  totalQuestions: number,
  correctAnswers: number,
  wrongRecords: WrongAnswerRecord[] = []
) {
  const progress = await getProgress();

  // 1. Update basic counters
  progress.completedQuizzes += 1;
  progress.correctAnswers += (progress.correctAnswers || 0) + correctAnswers; // Hoặc gán tích lũy chuẩn
  progress.totalQuestions = (progress.totalQuestions || 0) + totalQuestions;

  // 2. Calculate score percentage for this attempt
  const scorePercent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // 3. Add to quiz history
  const attempt: QuizAttempt = {
    id: Date.now().toString(),
    lessonId,
    totalQuestions,
    correctAnswers,
    scorePercent,
    completedAt: new Date().toISOString(),
  };

  if (!progress.quizHistory) {
    progress.quizHistory = [];
  }
  progress.quizHistory.push(attempt);

  // 4. Calculate overall average score
  const totalScoreSum = progress.quizHistory.reduce((sum, item) => sum + item.scorePercent, 0);
  progress.averageScore = Math.round(totalScoreSum / progress.quizHistory.length);

  // 5. Update wrong answers list (add new or update attempts if question already exists)
  if (!progress.wrongAnswers) {
    progress.wrongAnswers = [];
  }

  for (const newWrong of wrongRecords) {
    const existingIndex = progress.wrongAnswers.findIndex(
      (item) => item.questionId === newWrong.questionId
    );
    if (existingIndex >= 0) {
      // Update existing wrong answer record
      progress.wrongAnswers[existingIndex] = {
        ...progress.wrongAnswers[existingIndex],
        selectedAnswer: newWrong.selectedAnswer,
        attempts: (progress.wrongAnswers[existingIndex].attempts || 1) + 1,
        lastAttemptAt: new Date().toISOString(),
      };
    } else {
      // Add new wrong answer record
      progress.wrongAnswers.push({
        ...newWrong,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        attempts: 1,
        lastAttemptAt: new Date().toISOString(),
      });
    }
  }

  await saveProgress(progress);
  return progress;
}

// Backward compatible basic saveQuizResult function
export async function saveQuizResult(correctAnswers: number) {
  return saveQuizResultDetailed(undefined, 0, correctAnswers, []);
}

// Record alias
export const recordQuiz = saveQuizResult;

// Remove a wrong answer when user answers it correctly during review/retry
export async function removeWrongAnswer(questionId: string) {
  const progress = await getProgress();
  if (progress.wrongAnswers) {
    progress.wrongAnswers = progress.wrongAnswers.filter(
      (item) => item.questionId !== questionId
    );
    await saveProgress(progress);
  }
  return progress;
}