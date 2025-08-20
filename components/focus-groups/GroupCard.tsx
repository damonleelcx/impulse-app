import { FocusGroup } from '@/types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GroupCardProps {
  group: FocusGroup;
  onPress: () => void;
  onToggleMembership: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onPress,
  onToggleMembership,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{group.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {group.description}
        </Text>
        <Text style={styles.memberCount}>
          {group.memberCount.toLocaleString()} members
        </Text>
      </View>
      
      <TouchableOpacity
        style={[
          styles.actionButton,
          group.isJoined ? styles.leaveButton : styles.joinButton,
        ]}
        onPress={onToggleMembership}
      >
        <Text
          style={[
            styles.buttonText,
            group.isJoined ? styles.leaveButtonText : styles.joinButtonText,
          ]}
        >
          {group.isJoined ? 'Leave Group' : 'Join Group'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#007AFF',
  },
  leaveButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  joinButtonText: {
    color: 'white',
  },
  leaveButtonText: {
    color: '#FF3B30',
  },
});