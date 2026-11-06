import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { StatCard } from '@/components/statistic/stat-card';
import { ProgressChart } from '@/components/statistic/progress-chart';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { getProgress } from '@/services/storage-service';
import type { LearningProgress } from '@/types/lesson';

const EMPTY: LearningProgress = { completedLessonIds: [], completedQuizzes: 0, correctAnswers: 0 };

export default function StatisticScreen() {
  const [progress, setProgress] = useState(EMPTY);
  useEffect(() => { void getProgress().then(setProgress); }, []);
  return <Screen><ThemedText type="title">Your progress</ThemedText><ProgressChart completed={progress.completedLessonIds.length} total={2} /><View style={{ flexDirection: 'row', gap: 12 }}><StatCard label="Lessons completed" value={progress.completedLessonIds.length} /><StatCard label="Quizzes completed" value={progress.completedQuizzes} /></View><StatCard label="Correct answers" value={progress.correctAnswers} /></Screen>;
}
