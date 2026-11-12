import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { QuizQuestion } from '@/types/lesson';

export function MultipleChoice({ question, selected, onSelect }: { question: Extract<QuizQuestion, { type: 'multiple-choice' }>; selected: string | null; onSelect: (answer: string) => void }) {
  const scheme = useColorScheme();
  const palette = Colors[scheme === 'dark' ? 'dark' : 'light'];
  return <View style={styles.container}><Text style={[styles.prompt, { color: palette.text }]}>{question.prompt}</Text>{question.options.map((option) => <Pressable key={option} accessibilityRole="radio" accessibilityState={{ checked: selected === option }} onPress={() => onSelect(option)} style={[styles.option, { borderColor: selected === option ? palette.primary : palette.border }]}><Text style={{ color: palette.text }}>{option}</Text></Pressable>)}</View>;
}

const styles = StyleSheet.create({ container: { gap: Spacing.two }, prompt: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.two }, option: { borderWidth: 1, borderRadius: 12, padding: Spacing.three } });
