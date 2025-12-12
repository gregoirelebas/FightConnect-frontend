'use client';

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Role } from '../...types/enum';

interface User {
  userID: string;
  setUserID: Dispatch<SetStateAction<string>>;

  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
}

export const UserContext = createContext<User>({} as User);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userID, setUserID] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.Fighter);

  const user: User = {
    userID: userID,
    role: role,
    setUserID: setUserID,
    setRole: setRole,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
