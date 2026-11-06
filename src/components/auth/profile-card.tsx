import { AppCard } from '@/components/ui/app-card';
import { ThemedText } from '@/components/ui/themed-text';
import type { AppUser } from '@/types/auth';

export function ProfileCard({ user }: { user: AppUser | null }) {
  return <AppCard><ThemedText type="subtitle">{user?.displayName || 'English learner'}</ThemedText><ThemedText themeColor="muted">{user?.email ?? ''}</ThemedText></AppCard>;
}
