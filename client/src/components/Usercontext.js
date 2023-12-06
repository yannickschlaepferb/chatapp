import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, login, logout, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
