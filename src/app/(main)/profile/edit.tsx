import { useState } from 'react';
import { router } from 'expo-router';
import { TextInput } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { useAuth } from '@/hooks/use-auth';

export default function EditProfileScreen() {
  const { user, updateDisplayName } = useAuth();
  const [name, setName] = useState(user?.displayName ?? '');
  return <Screen><ThemedText type="title">Edit profile</ThemedText><TextInput accessibilityLabel="Display name" value={name} onChangeText={setName} placeholder="Display name" style={{ borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 14 }} /><AppButton title="Save changes" onPress={() => { void updateDisplayName(name).then(() => router.back()); }} /></Screen>;
}
