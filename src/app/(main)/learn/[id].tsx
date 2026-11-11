import { useLocalSearchParams, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { VocabularyCard } from '@/components/learn/vocabulary-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { getProgress, markLessonComplete } from '@/services/storage-service';
import { getLesson } from '@/services/lesson-service';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLesson(id);
  const [done, setDone] = useState(false);

  useEffect(() => {
    void getProgress().then((progress) => setDone(progress.completedLessonIds.includes(id)));
  }, [id]);

  if (!lesson) {
    return (
      <Screen>
        <ThemedText type="title">Lesson not found</ThemedText>
        <Link href="/(main)">Back to lessons</Link>
      </Screen>
    );
  }

  return (
    <Screen>
      <ThemedText type="title" style={{ marginTop: 12}}>{lesson.title}</ThemedText>
      <Text>{lesson.description}</Text>

      <ThemedText type="subtitle">Vocabulary</ThemedText>
      {lesson.vocabulary.map((item) => (
        <VocabularyCard key={item.word} word={item} />
      ))}

      <AppButton
        title={done ? 'Lesson completed' : 'Mark lesson complete'}
        disabled={done}
        onPress={() => {
          void markLessonComplete(lesson.id).then(() => setDone(true));
        }}
      />
    </Screen>
  );
}
