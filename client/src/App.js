import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { NavBar } from './components/NavBar';
import 'materialize-css';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Loader } from './components/Loader';


function App() {
  const { userId, accessToken, refreshToken, isAdmin, login, logout, ready } = useAuth();

  const isAuthenticated = !!accessToken;

  const routes = useRoutes(isAuthenticated, isAdmin);

  if(!ready){
    return <Loader size="big"/>
  }

  return (
    <AuthContext.Provider value={{ userId, token: accessToken, refreshToken, login, logout, isAuthenticated, isAdmin }}>
      <BrowserRouter>
        <div className="app">
          <NavBar isAuthenticated={isAuthenticated}></NavBar>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
