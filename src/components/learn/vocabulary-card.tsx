import { Text } from 'react-native';

import { AppCard } from '@/components/ui/app-card';
import { ThemedText } from '@/components/ui/themed-text';
import type { VocabularyWord } from '@/types/lesson';

export function VocabularyCard({ word }: { word: VocabularyWord }) {
  return <AppCard><ThemedText type="smallBold">{word.word} · {word.pronunciation}</ThemedText><Text>{word.meaning}</Text><Text>“{word.example}”</Text></AppCard>;
}
