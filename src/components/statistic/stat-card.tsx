import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function StatCard({ label, value }: { label: string; value: string | number }) {
  const scheme = useColorScheme();
  const palette = Colors[scheme === 'dark' ? 'dark' : 'light'];
  return <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}><Text style={[styles.value, { color: palette.text }]}>{value}</Text><Text style={{ color: palette.muted }}>{label}</Text></View>;
}

const styles = StyleSheet.create({ card: { flex: 1, borderWidth: 1, borderRadius: 16, padding: 16, gap: 8 }, value: { fontSize: 24, fontWeight: '700' } });
