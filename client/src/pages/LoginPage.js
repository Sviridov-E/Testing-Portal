import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';

export const LoginPage = () => {

  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);
  const { request, loading, clearError } = useHttp();

  const handleChange = event => {
    switch(event.target.name){
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        throw new Error();
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const data = await request('/api/auth/login', 'POST', { email, password });
      login(data.userId, data.token, data.isAdmin);
    } catch (e) {
      console.log('Ошибка при входе: ', e.message);
      clearError();
    }
  }
  if(loading) {
    return <Loader size="big"/>
  }
  return (
    <div className="container login-page">
      <div className="row login-container valign-wrapper">
        <div className="card-panel col s6 offset-s3 indigo accent-3 white-text">
          <h4>Вход</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="user-input input-field col s12">
                <input id="email" name="email" value={email} type="email" className="validate" onChange={handleChange}/>
                <label htmlFor="email">Адрес электронной почты</label>
                <span className="helper-text" data-error="Неверный формат" data-success=""></span>
              </div>
            </div>
            <div className="row">
              <div className="user-input input-field col s12">
                <input id="password" name="password" value={password} type="password" className="validate" onChange={handleChange}/>
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className='buttons'>
              <button className="btn waves-effect waves-light indigo darken-2" type="submit" name="submit">Войти</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}