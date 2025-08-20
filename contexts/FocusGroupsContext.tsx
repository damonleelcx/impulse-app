import { currentUser, mockGroups } from '@/constants/mockData';
import { FocusGroup, Message } from '@/types';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';


interface FocusGroupsContextType {
  groups: FocusGroup[];
  toggleGroupMembership: (groupId: string) => void;
  addMessage: (groupId: string, messageText: string) => void;
  getGroupById: (id: string) => FocusGroup | undefined;
}

const FocusGroupsContext = createContext<FocusGroupsContextType | undefined>(undefined);

interface FocusGroupsProviderProps {
  children: ReactNode;
}

export const FocusGroupsProvider: React.FC<FocusGroupsProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<FocusGroup[]>(mockGroups);

  const toggleGroupMembership = useCallback((groupId: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              isJoined: !group.isJoined,
              memberCount: group.isJoined 
                ? group.memberCount - 1 
                : group.memberCount + 1,
            }
          : group
      )
    );
  }, []);

  const addMessage = useCallback((groupId: string, messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      author: currentUser.name,
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              messages: [...group.messages, newMessage],
            }
          : group
      )
    );
  }, []);

  const getGroupById = useCallback((id: string) => {
    return groups.find(group => group.id === id);
  }, [groups]);

  const value = {
    groups,
    toggleGroupMembership,
    addMessage,
    getGroupById,
  };

  return (
    <FocusGroupsContext.Provider value={value}>
      {children}
    </FocusGroupsContext.Provider>
  );
};

export const useFocusGroups = () => {
  const context = useContext(FocusGroupsContext);
  if (context === undefined) {
    throw new Error('useFocusGroups must be used within a FocusGroupsProvider');
  }
  return context;
};