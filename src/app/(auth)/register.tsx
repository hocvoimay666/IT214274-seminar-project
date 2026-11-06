import { Text } from 'react-native';

import { AuthForm } from '@/components/auth/auth-form';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';

export default function RegisterScreen() {
  return <Screen><ThemedText type="title">Create account</ThemedText><Text>Start building a daily English learning habit.</Text><AuthForm mode="register" /></Screen>;
}
