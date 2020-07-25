import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { NavBar } from './components/NavBar';
import 'materialize-css';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Loader } from './components/Loader';


function App() {
  const { userId, accessToken, refreshToken, isAdmin, login, logout, ready, isActive, activate, resetActive } = useAuth();

  const isAuthenticated = !!accessToken;

  const routes = useRoutes(isAuthenticated, isAdmin, isActive);

  if(!ready){
    return <Loader size="big"/>
  }

  return (
    <AuthContext.Provider value={{ userId, token: accessToken, refreshToken, login, logout, isAuthenticated, isAdmin, isActive, activate, resetActive }}>
      <BrowserRouter>
        <div className="app">
          <NavBar isAuthenticated={isAuthenticated}></NavBar>
          <div className="row empty"></div>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
