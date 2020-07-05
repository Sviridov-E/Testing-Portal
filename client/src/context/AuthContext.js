import { createContext } from 'react';

export const AuthContext = createContext({
  userId: null,
  accessToken: null,
  refreshToken: null,
  login: ()=>{},
  logout: ()=>{},
  isAuthenticated: false,
  isAdmin: false
});