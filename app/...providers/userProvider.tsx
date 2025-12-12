'use client';

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Role } from '../...types/enum';

interface User {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;

  userID: string;
  setUserID: Dispatch<SetStateAction<string>>;

  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
}

export const UserContext = createContext<User>({} as User);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.Fighter);

  const user: User = {
    token: token,
    userID: userID,
    role: role,
    setToken: setToken,
    setUserID: setUserID,
    setRole: setRole,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
