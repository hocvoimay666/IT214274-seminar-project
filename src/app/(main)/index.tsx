import { Text } from 'react-native';

import { LessonCard } from '@/components/learn/lesson-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { getLessons } from '@/services/lesson-service';

export default function LearnScreen() {
  return <Screen><ThemedText type="title">What would you like to learn?</ThemedText><Text>Short lessons to help you practise a little every day.</Text>{getLessons().map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}</Screen>;
}
