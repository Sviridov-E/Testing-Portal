import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {
  const [token, setToken] = useState(null),
        [userId, setUserId] = useState(null),
        [isAdmin, setIsAdmin] = useState(false),
        [ready, setReady] = useState(false);

  const storageField = 'authData';

  const login = useCallback((id, token, isAdmin) => {
    setToken(token);
    setUserId(id);
    setIsAdmin(isAdmin);
    localStorage.setItem(storageField, JSON.stringify({userId: id, token: token, isAdmin: isAdmin}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(false);
    localStorage.removeItem(storageField);
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(storageField));
    if(data && data.userId){
      login(data.userId, data.token, data.isAdmin);
    }
    setReady(true);
  }, [login])

  return { login, logout, token, userId, isAdmin, ready }
}