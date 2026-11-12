import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Spacing } from '@/constants/constants';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function AppButton({ 
  title, 
  onPress, 
  disabled, 
  color 
}: { 
  title: string; 
  onPress: () => void; 
  disabled?: boolean;
  color?: string;
}) {
  const scheme = useColorScheme();
  const themeColors = Colors[scheme === 'dark' ? 'dark' : 'light']; 
  
  return (
    <Pressable 
      accessibilityRole="button" 
      disabled={disabled} 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.button, 
        // Priority input color
        { backgroundColor: color ? color : themeColors.primary }, 
        pressed && styles.pressed, 
        disabled && styles.disabled
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({ button: { minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingHorizontal: Spacing.four }, text: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 }, pressed: { opacity: 0.82 }, disabled: { opacity: 0.5 } });
