import { createContext } from 'react';

export const AuthContext = createContext({
  userId: null,
  accessToken: null,
  refreshToken: null,
  login: ()=>{},
  logout: ()=>{},
  activate: ()=>{},
  resetActive: ()=>{},
  isAuthenticated: false,
  isAdmin: false,
  isActive: false,
});