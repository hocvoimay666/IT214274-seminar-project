import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function AppCard({ children }: PropsWithChildren) {
  const scheme = useColorScheme();
  return <View style={[styles.card, { backgroundColor: Colors[scheme === 'dark' ? 'dark' : 'light'].surface, borderColor: Colors[scheme === 'dark' ? 'dark' : 'light'].border }]}>{children}</View>;
}

const styles = StyleSheet.create({ card: { width: '100%', borderWidth: 1, borderRadius: 18, padding: Spacing.four, gap: Spacing.two, minHeight: 135, justifyContent: 'center'} });
