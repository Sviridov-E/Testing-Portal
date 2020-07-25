import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {
  const [refreshToken, setRefreshToken] = useState(null),
        [accessToken, setAccessToken] = useState(null),
        [userId, setUserId] = useState(null),
        [isAdmin, setIsAdmin] = useState(false),
        [isActive, setIsActive] = useState(false),
        [ready, setReady] = useState(false);

  const storageField = 'authData';

  const login = useCallback((id, accessToken, refreshToken, isAdmin, isActive) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserId(id);
    setIsAdmin(isAdmin);
    setIsActive(isActive)
    localStorage.setItem(storageField, JSON.stringify({userId: id, accessToken, refreshToken, isAdmin: isAdmin, isActive: isActive}));
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);
    setIsAdmin(false);
    setIsActive(false);
    localStorage.removeItem(storageField);
  }, []);

  const activate = useCallback(() => {
    setIsActive(true);
    let data = JSON.parse(localStorage.getItem(storageField));
    data.isActive = true;
    localStorage.setItem(storageField, JSON.stringify(data));
  }, [])
  const resetActive = useCallback(() => {
    setIsActive(false);
    let data = JSON.parse(localStorage.getItem(storageField));
    data.isActive = false;
    localStorage.setItem(storageField, JSON.stringify(data));
  }, [])

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(storageField));
    if(data && data.userId){
      login(data.userId, data.accessToken, data.refreshToken, data.isAdmin, data.isActive);
    }
    setReady(true);
  }, [login])

  return { login, logout, accessToken, refreshToken, userId, isAdmin, ready, isActive, activate, resetActive }
}