import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { Suspense } from 'react';
import { Loader } from './components/Loader';

const UserPage = React.lazy(() => import('./pages/user/UserPage')),
  AllTests = React.lazy(() => import('./pages/AllTests')),
  Result = React.lazy(() => import('./pages/admin/Result')),
  Test = React.lazy(() => import('./pages/user/Test')),
  Users = React.lazy(() => import('./pages/admin/Users')),
  TestResult = React.lazy(() => import('./pages/admin/TestResult')),
  ConfirmEmail = React.lazy(() => import('./pages/ConfirmEmail')),
  ConfirmInfo = React.lazy(() => import('./pages/ConfirmInfo'));

export const useRoutes = (isAuthenticated, isAdmin, isActive) => {
  if (isAuthenticated && !isActive) {
    return (
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route path="/confirm" exact>
            <ConfirmInfo />
          </Route>
          <Route path="/confirm/:hash">
            <ConfirmEmail />
          </Route>
          <Redirect to="/confirm" />
        </Switch>
      </Suspense>
    );
  }
  if (isAuthenticated && isAdmin) {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/profile/:id" exact>
            <UserPage />
          </Route>
          <Route path="/tests" exact>
            <AllTests />
          </Route>
          <Route path="/result" exact>
            <Result />
          </Route>
          <Route path="/tests/result/:id">
            <TestResult />
          </Route>
          <Route path="/confirm/:hash">
            <ConfirmEmail />
          </Route>
          <Redirect to="/users" />
        </Switch>
      </Suspense>
    );
  }
  if (isAuthenticated) {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/profile" exact>
            <UserPage />
          </Route>
          <Route path="/tests" exact>
            <AllTests />
          </Route>
          <Route path="/tests/:id">
            <Test />
          </Route>
          <Route path="/confirm/:hash">
            <ConfirmEmail />
          </Route>
          <Redirect to="/profile" />
        </Switch>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/confirm/:hash">
          <ConfirmEmail />
        </Route>
        <Route path="/confirm" exact>
          <ConfirmInfo />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );
};
