import React, { useRef, useEffect, useState } from 'react';
import '../styles/registerPage.scss'
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { useHistory} from 'react-router-dom';

export const RegisterPage = () => {
  const birthdateRef = useRef(null);
  const gradeNumberRef = useRef(null);
  const gradeLetterRef = useRef(null);

  const history = useHistory();


  const { request, loading, error, clearError} = useHttp();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    password: '',
    gradeNumber: '',
    gradeLetter: '',
    gender: ''
  });

  useEffect(()=>{
    window.M.updateTextFields();
  }, [])

  useEffect(()=>{
    console.log('Ошибка при авторизации: ', error);    
    clearError();
  }, [error, clearError]);

  const fieldsNotEmpty = obj => {
    for (let value of Object.values(obj)){
      if(!value) return false;
    }
    return true;
  }

  const handleChange = event => {
    const name = event.target.name;
    setState({...state, [name]: event.target.value})
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if(!fieldsNotEmpty(state)){
      return window.M.toast({html: 'Все поля должны быть заполнены!'})
    }
    if(state)
    try {
      const data = await request('/api/auth/register', 'POST', state);
      if(data) {
        history.push('/login');
      }
    } catch (e) {
      window.M.toast({html: `Ошибка регистрации: ${e.message}`})
    }
  }

  useEffect(()=>{
    
    const params = {
      onSelect(value){
        setState(state => {
          return { ...state, birthdate: value };
        })
      },
      autoClose: true,
      format: 'dd.mm.yyyy',
      showDaysInNextAndPreviousMonths: false,
      yearRange: [1980, 2020],
      i18n: {
        cancel: 'Отмена',
        months: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
        weekdays: [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
        weekdaysAbbrev: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
        weekdaysShort: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
        monthsShort: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]
      }
    };
    window.M.Datepicker.init(birthdateRef.current, params);
    window.M.FormSelect.init(gradeNumberRef.current);
    window.M.FormSelect.init(gradeLetterRef.current);
  }, []);
  
  if(loading) {
    return <Loader size="big"/>
  }
  return (
    <div className="container register-page">
      <div className="row register-container valign-wrapper">
        <div className="card-panel col s6 offset-s3 indigo accent-3 white-text">
          <h4>Регистрация</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="user-input input-field col m6 s12">
                <input id="firstName" name="firstName" value={state.firstName} type="text" className="validate" onChange={handleChange}/>
                <label htmlFor="firstName">Имя</label>
              </div>
              <div className="user-input input-field col m6 s12">
                <input id="lastName" name="lastName" value={state.lastName} type="text" className="validate" onChange={handleChange}/>
                <label htmlFor="lastName">Фамилия</label>
              </div>
            </div>
            <div className="row">
              <div className="user-input input-field col s7">
                <input id="email" name="email" value={state.email} type="email" className="validate" onChange={handleChange}/>
                <label htmlFor="email">Адрес электронной почты</label>
                <span className="helper-text" data-error="Неверный формат" data-success=""></span>
              </div>
              <div className="gender user-input input-field col s5">
                <fieldset onChange={handleChange}>
                    <span className="title">Пол</span>
                    <label>
                      <input name='gender' type="radio" value="male"/>
                      <span>М</span>
                    </label>
                    <label>
                      <input name='gender' type="radio" value="female"/>
                      <span>Ж</span>
                    </label>
                </fieldset>
              </div>
            </div>
            <div className="row">
              <div className="user-input input field col m6 s12">
                <div className="black-text input-field birthdate">
                  <input ref={birthdateRef} name="birthdate" value={state.birthdate.toLocaleDateString ? state.birthdate.toLocaleDateString() : ''} onChange={handleChange} type="text" className="datepicker"/>
                  <label>Дата рождения</label>
                </div>
              </div>
              <div className="user-input input-field col m3 s12">
                <select name="gradeNumber" ref={gradeNumberRef} onChange={handleChange}>
                  <option disabled value=''>1</option>
                  <option value={`1`}>{`1`}</option>
                  <option value={`2`}>{`2`}</option>
                  <option value={`3`}>{`3`}</option>
                  <option value={`4`}>{`4`}</option>
                  <option value={`5`}>{`5`}</option>
                  <option value={`6`}>{`6`}</option>
                  <option value={`7`}>{`7`}</option>
                  <option value={`8`}>{`8`}</option>
                  <option value={`9`}>{`9`}</option>
                  <option value={`10`}>{`10`}</option>
                  <option value={`11`}>{`11`}</option>
                </select>
                <label>Класс</label>
              </div>
              <div className="user-input input-field col m3 s12">
                <select name="gradeLetter" ref={gradeLetterRef} onChange={handleChange}>
                  <option disabled selected value=''>А</option>
                  <option value={`А`}>{`А`}</option>
                  <option value={`Б`}>{`Б`}</option>
                  <option value={`В`}>{`В`}</option>
                  <option value={`Г`}>{`Г`}</option>
                  <option value={`Д`}>{`Д`}</option>
                  <option value={`Е`}>{`Е`}</option>
                  <option value={`Ж`}>{`Ж`}</option>
                  <option value={`З`}>{`З`}</option>
                  <option value={`И`}>{`И`}</option>
                </select>
                <label>Буква</label>
              </div>
            </div>
            <div className="row">
              <div className="user-input input-field col s12">
                <input id="password" name="password" value={state.password} type="password" className="validate" onChange={handleChange}/>
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className='buttons'>
              <button className="btn waves-effect waves-light indigo darken-2" type="submit" name="submit">Зарегистрироваться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}