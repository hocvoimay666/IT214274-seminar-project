import { Text } from 'react-native';

import { AuthForm } from '@/components/auth/auth-form';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { APP_NAME } from '@/constants/constants';

export default function LoginScreen() {
  return <Screen><ThemedText type="title">Welcome back</ThemedText><Text>Sign in to continue learning with {APP_NAME}.</Text><AuthForm mode="login" /></Screen>;
}
