import { View } from 'react-native';
import { ThemedText } from '@/components/ui/themed-text';
import { AppCard } from '@/components/ui/app-card';
import { formatPercent } from '@/constants/formatters';

export function ProgressChart({ completed, total }: { completed: number; total: number }) {
  const percent = total ? Math.min(100, (completed / total) * 100) : 0;
  return <AppCard><ThemedText type="default" themeColor="muted">Lesson completion · {formatPercent(percent)}</ThemedText><View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: percent }} style={{ height: 8, borderRadius: 8, backgroundColor: '#E1E7F0', overflow: 'hidden' }}><View style={{ width: `${percent}%`, height: '100%', backgroundColor: '#3568D4' }} /></View></AppCard>;
}
