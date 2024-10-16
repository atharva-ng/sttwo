import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: null,
  token: null,
  login: () => { },
  logout: () => { }
});
