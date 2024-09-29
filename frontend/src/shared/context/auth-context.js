import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userType: null,
  token: null,
  login: () => { },
  logout: () => { }
});
