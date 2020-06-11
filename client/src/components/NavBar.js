import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthedNavBar } from './AuthedNavBar';

import '../styles/navBar.scss'

export const NavBar = ({ isAuthenticated }) => {
  const content = isAuthenticated ? (
    <AuthedNavBar/>
  ) : (
    <>
      <li>
        <NavLink to="/register"><span className="link-name">Регистрация</span></NavLink>
      </li>
      <li>
        <NavLink to="/login"><span className="link-name">Войти</span></NavLink>
      </li>
    </>
  );

  return (
    <nav className="indigo accent-2">
      <div className="nav-wrapper">
        <span className="brand-logo right logo">Logo</span>
        <ul id="nav-mobile" className="left">
          {content}
        </ul>
      </div>
    </nav>
  );
}