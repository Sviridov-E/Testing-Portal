import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/userFilter.scss';

export const UserFilter = ({ requestParams, setRequestParams, params, whereSearchButtonClick = () => {} }) => {
  const history = useHistory();
  
  useEffect(() => {
    const elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems);
  }, [])

  const handleChange = event => {
    setRequestParams({...requestParams, [event.target.name]: event.target.value ? event.target.value : null});
  }
  const handleButtonClick = (e) => {
    e.preventDefault();
    whereSearchButtonClick();
    let url = new URL(window.location.href)
    Object.entries(requestParams).forEach(([key, value]) => {
      if(!value){
        url.searchParams.delete(key);
        return;
      }; 
      url.searchParams.set(key, value);
    })
    const queryString = url.search;
    
    history.push(queryString || '?');
  }
  let content = {
    firstName: (
      <div key={0} className="input-field col l3 m6 s12 firstname">
        <input placeholder="Петр" id="first_name" type="text" className="validate" name="firstName" onChange={handleChange}/>
        <label className="active" htmlFor="first_name">Имя</label>
      </div>
    ),
    lastName: (
      <div key={1} className="input-field col l3 m6 s12 lastname">
        <input placeholder="Иванов" id="last_name" type="text" className="validate" name="lastName" onChange={handleChange}/>
        <label className="active" htmlFor="last_name">Фамилия</label>
      </div>
    ),
    gradeNumber: (
      <div key={2} className={`input-field col class-number ${params ? 'm3 s6' : 'l1 m2 s6'}`}>
        <input placeholder="10" id="class_number" type="text" className="validate" name="gradeNumber" onChange={handleChange}/>
        <label className="active" htmlFor="class_number">Класс</label>
      </div>
    ),
    gradeLetter: (
      <div key={3} className={`input-field col class-letter ${params ? 'm3 s6' : 'l1 m2 s6'}`}>
        <input placeholder="Б" id="class_letter" type="text" className="validate" name="gradeLetter" onChange={handleChange}/>
        <label className="active" htmlFor="class_letter">Буква</label>
      </div>
    ),
    gender: (
      <div key={4} className={`input-field col gender ${params ? 'm3 s6' : 'l2 m4 s6'}`}>
        <select name='gender' onChange={handleChange} value={requestParams.gender ? requestParams.gender : 'Все'}>
          <option value={''}>Все</option>
          <option value={'male'}>М</option>
          <option value={'female'}>Ж</option>
        </select>
        <label>Пол</label>
      </div>
    ),
    button: (
      <div key={5} className={`search-button col ${params ? 'm3 s6' : 'l2 m4 s6'}`}>
        <a href="/" onClick={handleButtonClick} className="waves-effect waves-light btn indigo accent-4"><div><i className="material-icons">search</i>Найти</div></a>
      </div>
    )
  }
  if(params){
    content = Object.entries(content)
      .map(([key, value]) => {
        if(params.includes(key) || key === 'button') return value;
        return null;
      })
      .filter(value => value);
  } else {
    content = Object.values(content);
  }
  return (
    <div className="container user-filter">
      <div className="row card-panel">
        {
            content
        }
      </div>
    </div>
  );
}