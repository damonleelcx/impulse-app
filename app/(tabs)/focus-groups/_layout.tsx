import { Stack } from 'expo-router';

export default function FocusGroupsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Focus Groups',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}