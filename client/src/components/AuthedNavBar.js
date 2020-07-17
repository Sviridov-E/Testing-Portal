import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const AuthedNavBar = () => {
  const { logout, isAdmin } = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    logout();
  }
  const content = isAdmin ? (
    <>
      <li>
        <a href="/" onClick={logoutHandler}><span className="link-name">Выйти</span></a>
      </li>
      <li>
        <NavLink to="/users"><span className="link-name">Пользователи</span></NavLink>
      </li>
      <li>
        <NavLink to="/tests"><span className="link-name">Тесты</span></NavLink>
      </li>
      <li>
        <NavLink to="/result"><span className="link-name">Итоги</span></NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <a href="/" onClick={logoutHandler}><span className="link-name">Выйти</span></a>
      </li>
      <li>
        <NavLink to="/profile"><span className="link-name">Профиль</span></NavLink>
      </li>
      <li>
        <NavLink to="/tests"><span className="link-name">Тесты</span></NavLink>
      </li>
    </>
  );
  return content;
}