import { Link } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { ProfileCard } from '@/components/auth/profile-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const theme = useTheme();
  return (
    <Screen>
      <ThemedText type="title" style={{ marginTop: 15 }}>Your profile</ThemedText>
      <ProfileCard user={user} />
      <Link href="/(main)/profile/edit" style={{ color: theme.text, fontStyle: 'italic' }}>Edit profile</Link>
      <AppButton title="Sign out" onPress={() => { void signOut(); }} />
    </Screen>
  );
}
