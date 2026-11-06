import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { AppCard } from '@/components/ui/app-card';
import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Lesson } from '@/types/lesson';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const scheme = useColorScheme();
  const palette = Colors[scheme === 'dark' ? 'dark' : 'light'];
  return <Link href={{ pathname: '/(main)/learn/[id]', params: { id: lesson.id } }}><AppCard><Text style={[styles.title, { color: palette.text }]}>{lesson.title}</Text><Text style={{ color: palette.muted }}>{lesson.level}</Text><Text style={{ color: palette.text }}>{lesson.description}</Text></AppCard></Link>;
}

const styles = StyleSheet.create({ title: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.one } });
