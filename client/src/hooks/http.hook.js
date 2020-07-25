import { useState, useCallback, useContext } from "react"
import { useRefresh } from "./refresh.hook";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { resetActive } = useContext(AuthContext);

  const refresh = useRefresh();

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if(body) {
        body = JSON.stringify(body);
        headers['Content-Type']= 'application/json';
      }
      const response = await fetch(url, {
        method,
        body,
        headers
      });
      let data = await response.json();
      if(data.tokenExpired){
        await refresh();
        return;
      }
      if(data.notActive) {
        return resetActive();

      }
      const status = response.status;
      Object.defineProperty(data, 'status', {
        value: status,
        writable: false,
        enumerable: false,
        configurable: false
      });
            

      if(!response.ok){
        throw new Error(data.message || 'Что-то пошло не так');
      }
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
    // eslint-disable-next-line
  }, []);
  const clearError = useCallback(()=>{
    setError(null);
  }, [])

  return {loading, request, error, clearError};
}