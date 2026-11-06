import { Tabs } from 'expo-router';

export default function AppTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3568D4' }}>
      <Tabs.Screen name="index" options={{ title: 'Learn' }} />
      <Tabs.Screen name="practice/index" options={{ title: 'Practice' }} />
      <Tabs.Screen name="statistic/index" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile/index" options={{ title: 'Profile' }} />
      <Tabs.Screen name="learn/[id]" options={{ href: null }} />
      <Tabs.Screen name="profile/edit" options={{ href: null }} />
    </Tabs>
  );
}
