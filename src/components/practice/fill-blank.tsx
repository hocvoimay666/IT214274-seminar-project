import { StyleSheet, TextInput, View } from 'react-native';

import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function FillBlank({ value, onChangeText, placeholder = 'Type your answer' }: { value: string; onChangeText: (value: string) => void; placeholder?: string }) {
  const scheme = useColorScheme();
  const palette = Colors[scheme === 'dark' ? 'dark' : 'light'];
  return <View><TextInput accessibilityLabel={placeholder} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={palette.muted} style={[styles.input, { color: palette.text, borderColor: palette.border }]} /></View>;
}

const styles = StyleSheet.create({ input: { borderWidth: 1, borderRadius: 12, padding: Spacing.three, minHeight: 48 } });
