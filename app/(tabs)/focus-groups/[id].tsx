
import { ChatInput } from '@/components/focus-groups/ChatInput';
import { MessageItem } from '@/components/focus-groups/MessageItem';
import { useFocusGroups } from '@/contexts/FocusGroupsContext';
import { Message } from '@/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';


export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getGroupById, addMessage, toggleGroupMembership } = useFocusGroups();
  const flatListRef = useRef<FlatList>(null);
  
  const group = getGroupById(id!);

  useEffect(() => {
    if (!group) {
      Alert.alert('Error', 'Group not found', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  }, [group]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (group?.messages.length && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [group?.messages.length]);

  if (!group) {
    return null;
  }

  const handleSendMessage = (messageText: string) => {
    if (!group.isJoined) {
      Alert.alert(
        'Join Required', 
        'You need to join this group to send messages.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Join Group', 
            onPress: () => toggleGroupMembership(group.id) 
          }
        ]
      );
      return;
    }
    addMessage(group.id, messageText);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageItem message={item} />
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: group.title,
          headerStyle: { backgroundColor: 'white' },
        }}
      />
      
      <View style={styles.header}>
        <Text style={styles.description}>{group.description}</Text>
        <Text style={styles.memberCount}>
          {group.memberCount.toLocaleString()} members
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={group.messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: false });
        }}
      />

      <ChatInput onSendMessage={handleSendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
    backgroundColor: 'white',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContent: {
    paddingVertical: 16,
  },
});