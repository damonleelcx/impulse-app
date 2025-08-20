import { Tabs } from 'expo-router';
import React from 'react';
import { FocusGroupsProvider } from '../contexts/FocusGroupsContext';

export default function TabLayout() {
  return (
    <FocusGroupsProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
        <Tabs.Screen
          name="focus-groups"
          options={{
            title: 'Focus Groups',
            headerShown: false,
          }}
        />
      </Tabs>
    </FocusGroupsProvider>
  );
}