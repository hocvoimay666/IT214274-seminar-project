import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { ProfileCard } from '@/components/auth/profile-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const theme = useTheme();
  return (
    <Screen>
      <ThemedText type="title" style={{ marginTop: 15 }}>Your profile</ThemedText>
      <ProfileCard user={user} />
      <Link href="/(main)/profile/edit">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="pencil-outline" size={16} color={theme.text} />
          <Text style={{ color: theme.text, fontStyle: 'italic' }}>Edit profile</Text>
        </View>
      </Link>      
      <AppButton title="Sign out" onPress={() => { void signOut(); }} color="red" />
    </Screen>
  );
}
