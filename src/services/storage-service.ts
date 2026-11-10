import AsyncStorage from '@react-native-async-storage/async-storage';

import { PROGRESS_STORAGE_KEY } from '@/constants/constants';
import type { LearningProgress } from '@/types/statistic';

const EMPTY_PROGRESS: LearningProgress = { completedLessonIds: [], completedQuizzes: 0, correctAnswers: 0 };

// Read progress from device storage
export async function getProgress(): Promise<LearningProgress> {
  const raw = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!raw) return EMPTY_PROGRESS;
  try {
    return { ...EMPTY_PROGRESS, ...JSON.parse(raw) } as LearningProgress;
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

// Record quiz result to local storage
export async function saveQuizResult(correctAnswers: number) {
  const progress = await getProgress();
  progress.completedQuizzes += 1;
  progress.correctAnswers += correctAnswers;
  await saveProgress(progress);
  return progress;
}

// Alias for backward compatibility
export const recordQuiz = saveQuizResult;
