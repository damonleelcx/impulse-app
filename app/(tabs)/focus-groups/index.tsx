import { GroupCard } from '@/app/components/GroupCard';
import { useFocusGroups } from '@/app/contexts/FocusGroupsContext';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';


export default function FocusGroupsScreen() {
  const { groups, toggleGroupMembership } = useFocusGroups();

  const handleGroupPress = (groupId: string) => {
    router.push(`/focus-groups/${groupId}`);
  };

  const handleToggleMembership = (groupId: string) => {
    toggleGroupMembership(groupId);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onPress={() => handleGroupPress(group.id)}
            onToggleMembership={() => handleToggleMembership(group.id)}
          />
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});