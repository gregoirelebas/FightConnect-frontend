'use client';

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface User {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<User>({} as User);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const user: User = { setToken, token };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
