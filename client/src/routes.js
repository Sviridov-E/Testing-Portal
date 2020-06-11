import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { UserPage } from './pages/user/UserPage';
import { AllTests } from './pages/AllTests';
import { Result } from './pages/admin/Result';
import { Test } from './pages/user/Test';
import { UserResult } from './pages/admin/UserResult';
import { Users } from './pages/admin/Users';
import { TestResult } from './pages/admin/TestResult';

export const useRoutes = (isAuthenticated, isAdmin) => {
  
  if(isAuthenticated && isAdmin){
    return (
      <Switch>
        <Route path="/users" exact>
          <Users/>
        </Route>
        <Route path="/users/profile/:id" exact>
          <UserPage/>
        </Route>
        <Route path="/tests" exact>
          <AllTests/>
        </Route>
        <Route path="/result" exact>
          <Result/>
        </Route>
        <Route path="/tests/result/:id">
          <TestResult/>
        </Route>
        <Route path="/result/:id">
          <UserResult/>
        </Route>

        <Redirect to="/users"/>
      </Switch>
    );
  }
  if(isAuthenticated){
    return (
      <Switch>
        <Route path="/profile" exact>
          <UserPage/>
        </Route>
        <Route path="/tests" exact>
          <AllTests/>
        </Route>
        <Route path="/result" exact>
          <Result/>
        </Route>
        <Route path="/tests/:id">
          <Test/>
        </Route>

        <Redirect to="/profile"/>
      </Switch>
    );
  }  
  return (
    <Switch>
      <Route path="/register" exact>
        <RegisterPage/>
      </Route>
      <Route path="/login" exact>
        <LoginPage/>
      </Route>
      <Redirect to="/register"/>
    </Switch>
  );
}