import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {
  const [refreshToken, setRefreshToken] = useState(null),
        [accessToken, setAccessToken] = useState(null),
        [userId, setUserId] = useState(null),
        [isAdmin, setIsAdmin] = useState(false),
        [ready, setReady] = useState(false);

  const storageField = 'authData';

  const login = useCallback((id, accessToken, refreshToken, isAdmin) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserId(id);
    setIsAdmin(isAdmin);
    localStorage.setItem(storageField, JSON.stringify({userId: id, accessToken, refreshToken, isAdmin: isAdmin}));
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);
    setIsAdmin(false);
    localStorage.removeItem(storageField);
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(storageField));
    if(data && data.userId){
      login(data.userId, data.accessToken, data.refreshToken, data.isAdmin);
    }
    setReady(true);
  }, [login])

  return { login, logout, accessToken, refreshToken, userId, isAdmin, ready }
}