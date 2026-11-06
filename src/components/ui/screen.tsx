import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Screen({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  const scheme = useColorScheme();
  const content = <View style={styles.content}>{children}</View>;
  return scroll
    ? <ScrollView style={[styles.screen, { backgroundColor: Colors[scheme === 'dark' ? 'dark' : 'light'].background }]} contentContainerStyle={styles.scroll}>{content}</ScrollView>
    : <View style={[styles.screen, styles.scroll, { backgroundColor: Colors[scheme === 'dark' ? 'dark' : 'light'].background }]}>{content}</View>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, scroll: { flexGrow: 1 }, content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: Spacing.five, gap: Spacing.four } });
