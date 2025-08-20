import { FocusGroup } from '../types';

export const mockGroups: FocusGroup[] = [
  {
    id: '1',
    title: 'UI/UX Designers',
    description: 'A community for designers to share ideas, feedback, and discuss latest trends in user interface and experience design.',
    memberCount: 1247,
    isJoined: false,
    messages: [
      {
        id: '1',
        text: 'Hey everyone! Just discovered this amazing new design system. What do you all think about atomic design principles?',
        author: 'Sarah Chen',
        timestamp: new Date('2024-01-15T10:30:00'),
        isCurrentUser: false,
      },
      {
        id: '2',
        text: 'I love atomic design! Been using it in my projects for the past year. Makes everything so much more scalable.',
        author: 'Mike Rodriguez',
        timestamp: new Date('2024-01-15T10:45:00'),
        isCurrentUser: false,
      },
      {
        id: '3',
        text: 'Can someone share some good resources for learning Figma advanced features?',
        author: 'Emily Watson',
        timestamp: new Date('2024-01-15T11:00:00'),
        isCurrentUser: false,
      },
    ],
  },
  {
    id: '2',
    title: 'React Native Developers',
    description: 'Connect with fellow React Native developers. Share code, troubleshoot issues, and stay updated with the latest RN updates.',
    memberCount: 892,
    isJoined: true,
    messages: [
      {
        id: '4',
        text: 'Has anyone tried the new Expo Router? Thoughts on the file-based routing system?',
        author: 'Alex Kumar',
        timestamp: new Date('2024-01-15T09:15:00'),
        isCurrentUser: false,
      },
      {
        id: '5',
        text: 'Yes! It\'s a game changer. Much cleaner than the old navigation setup. The nested layouts feature is particularly nice.',
        author: 'You',
        timestamp: new Date('2024-01-15T09:30:00'),
        isCurrentUser: true,
      },
      {
        id: '6',
        text: 'I\'m still getting used to it, but the developer experience is definitely improved. Less boilerplate code.',
        author: 'Jessica Park',
        timestamp: new Date('2024-01-15T09:45:00'),
        isCurrentUser: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Product Managers',
    description: 'Strategic discussions on product development, user research, roadmap planning, and cross-functional collaboration.',
    memberCount: 654,
    isJoined: false,
    messages: [
      {
        id: '7',
        text: 'What metrics do you all use to measure user engagement in mobile apps?',
        author: 'David Thompson',
        timestamp: new Date('2024-01-15T14:20:00'),
        isCurrentUser: false,
      },
      {
        id: '8',
        text: 'DAU/MAU ratio, session length, and feature adoption rates are my go-to metrics.',
        author: 'Lisa Chang',
        timestamp: new Date('2024-01-15T14:35:00'),
        isCurrentUser: false,
      },
    ],
  },
  {
    id: '4',
    title: 'Startup Founders',
    description: 'A supportive community for entrepreneurs and startup founders to share experiences, challenges, and celebrate wins.',
    memberCount: 423,
    isJoined: true,
    messages: [
      {
        id: '9',
        text: 'Just closed our seed round! 🎉 Happy to share lessons learned if anyone\'s interested.',
        author: 'Rachel Green',
        timestamp: new Date('2024-01-15T16:00:00'),
        isCurrentUser: false,
      },
      {
        id: '10',
        text: 'Congratulations! Would love to hear about your pitch deck strategy.',
        author: 'Mark Wilson',
        timestamp: new Date('2024-01-15T16:15:00'),
        isCurrentUser: false,
      },
    ],
  },
];

export const currentUser = {
  id: 'current-user',
  name: 'You',
};