import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const UserFilter = ({ requestParams, setRequestParams, fetchedUsers }) => {
  const history = useHistory();
  
  useEffect(() => {
    const elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems);
  }, [])

  const handleChange = event => {
    setRequestParams({...requestParams, [event.target.name]: event.target.value ? event.target.value : null});
  }
  const handleClick = (e) => {
    e.preventDefault();
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
  return (
    <div className="container user-filter">
      <div className="row card-panel">
        <div className="input-field col firstname">
          <input placeholder="Петр" id="first_name" type="text" className="validate" name="firstName" onChange={handleChange}/>
          <label className="active" htmlFor="first_name">Имя</label>
        </div>
        <div className="input-field col lastname">
          <input placeholder="Иванов" id="last_name" type="text" className="validate" name="lastName" onChange={handleChange}/>
          <label className="active" htmlFor="last_name">Фамилия</label>
        </div>
        <div className="input-field col class-number">
          <input placeholder="10" id="class_number" type="text" className="validate" name="gradeNumber" onChange={handleChange}/>
          <label className="active" htmlFor="class_number">Класс</label>
        </div>
        <div className="input-field col class-letter">
          <input placeholder="Б" id="class_letter" type="text" className="validate" name="gradeLetter" onChange={handleChange}/>
          <label className="active" htmlFor="class_letter">Буква</label>
        </div>
        <div className="input-field col">
          <select name='gender' onChange={handleChange} value={requestParams.gender ? requestParams.gender : 'Все'}>
            <option value={''}>Все</option>
            <option value={'М'}>М</option>
            <option value={'Ж'}>Ж</option>
          </select>
          <label>Пол</label>
        </div>
        <div className="search-button">
          <a href="/" onClick={handleClick} className="waves-effect waves-light btn indigo accent-4"><div><i className="material-icons">search</i>Найти</div></a>
        </div>
      </div>
    </div>
  );
}