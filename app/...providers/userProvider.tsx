'use client';

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Role } from '../...types/enum';

interface User {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;

  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
}

export const UserContext = createContext<User>({} as User);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.Fighter);

  const user: User = {
    token: token,
    role: role,
    setToken: setToken,
    setRole: setRole,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
