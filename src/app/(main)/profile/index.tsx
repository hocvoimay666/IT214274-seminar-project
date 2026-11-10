import { Link } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { ProfileCard } from '@/components/auth/profile-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { useAuth } from '@/hooks/use-auth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <Screen>
      <ThemedText type="title">Your profile</ThemedText>
      <ProfileCard user={user} />
      <Link href="/(main)/profile/edit">Edit profile</Link>
      <AppButton title="Sign out" onPress={() => { void signOut(); }} />
    </Screen>
  );
}
