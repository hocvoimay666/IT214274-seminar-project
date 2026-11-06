import { AppCard } from '@/components/ui/app-card';
import { ThemedText } from '@/components/ui/themed-text';

export function GrammarPoint({ title, explanation, example }: { title: string; explanation: string; example: string }) {
  return <AppCard><ThemedText type="smallBold">{title}</ThemedText><ThemedText>{explanation}</ThemedText><ThemedText type="small">{example}</ThemedText></AppCard>;
}
