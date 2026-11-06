import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function AppButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  const scheme = useColorScheme();
  const color = Colors[scheme === 'dark' ? 'dark' : 'light'];
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: color.primary }, pressed && styles.pressed, disabled && styles.disabled]}><Text style={styles.text}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({ button: { minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingHorizontal: Spacing.four }, text: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 }, pressed: { opacity: 0.82 }, disabled: { opacity: 0.5 } });
