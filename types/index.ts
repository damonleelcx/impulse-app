export interface FocusGroup {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  messages: Message[];
}

export interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export interface User {
  id: string;
  name: string;
}