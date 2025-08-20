import { Message } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={[
      styles.container,
      message.isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
    ]}>
      <View style={[
        styles.messageBubble,
        message.isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
      ]}>
        {!message.isCurrentUser && (
          <Text style={styles.author}>{message.author}</Text>
        )}
        <Text style={[
          styles.messageText,
          message.isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          message.isCurrentUser ? styles.currentUserTimestamp : styles.otherUserTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  otherUserMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentUserBubble: {
    backgroundColor: '#007AFF',
  },
  otherUserBubble: {
    backgroundColor: '#F0F0F0',
  },
  author: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  currentUserText: {
    color: 'white',
  },
  otherUserText: {
    color: '#1a1a1a',
  },
  timestamp: {
    fontSize: 11,
  },
  currentUserTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherUserTimestamp: {
    color: '#999',
  },
});