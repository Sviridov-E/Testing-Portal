import { useContext, useCallback } from "react";
import { AuthContext } from '../context/AuthContext';

export const useRefresh = () => {
    const context = useContext(AuthContext);

    const refresh = useCallback(async () => {
        try {           
            const response = await fetch('/api/refresh-token', {
                headers: {
                    Authorization: `Bearer ${context.refreshToken}`
                }
            })
            const {userId, accessToken, refreshToken, isAdmin} = await response.json();

            context.login(userId, accessToken, refreshToken, isAdmin);
        } catch(e) {
            console.log('Error in "useRefresh": ', e.message);
            throw e;
        }

    }, [context])
    return refresh;
}