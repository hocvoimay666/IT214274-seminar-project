import { Text } from 'react-native';

import { AppCard } from '@/components/ui/app-card';
import { ThemedText } from '@/components/ui/themed-text';
import type { Vocabulary } from '@/types/lesson';

export function VocabularyCard({ word }: { word: Vocabulary }) {
  return <AppCard><ThemedText type="smallBold">{word.word} · {word.pronunciation}</ThemedText><Text>{word.meaning}</Text></AppCard>;
}
