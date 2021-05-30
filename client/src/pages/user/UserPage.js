import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { NotAuthenticated } from '../../components/NotAuthenticated';
import { Loader } from '../../components/Loader';
import '../../styles/userPage.scss';
import genderMale from '../../icons/male.svg';
import genderFemale from '../../icons/female.svg';
import { ResultModalWindow } from '../../components/ResultModalWindow/ResultModalWindow';
import { useModalResult } from '../../hooks/modalResult.hook';
import { useLocation } from 'react-router-dom';
 
export const UserPage = () => {
  
  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    birthdate: null,
    grade: null,
    gender: null,
    passedTests: null,
  })
  const { token, isAuthenticated, isAdmin } = useContext(AuthContext);

  let location = useLocation();
  let userId = '';
  if(isAdmin) userId = location.pathname.slice(-24);
  else location = null;

  const { request, loading } = useHttp();

  const fetchedData = useCallback( async () => {
    // Информация о пользователе
    try {
      const data = await request(`/api/users/profile/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      if(!data) return;
      const birthdate = new Date(data.birthdate)
      
      setState({...data, birthdate: birthdate});
    } catch (e) {
      console.log(e.message);
      
    }
  }, [token, request, userId]);

  const getFullYears = arg => {
    if(!arg) return;
    let date = new Date(arg);
    const dateNow = new Date();
    let probablyYear = dateNow.getFullYear() - date.getFullYear();
    date.setFullYear(dateNow.getFullYear());
    let birthdayHasPassed = dateNow.getTime() - date.getTime() >= 0 ? true : false;

    const result = birthdayHasPassed ? probablyYear : probablyYear - 1;

    if(result < 10 || result > 20){
      const remainder = result%10;
      if(remainder === 1) return `${result} год`;
      if(remainder > 1 && remainder < 5) return `${result} года`;
    }
    return `${result} лет`;
  }

  const modal = useModalResult(token, userId);

  const handleTestClick = event => {
    modal.setTestId(event.currentTarget.dataset.testId);
    modal.openWindow();    
  }


  // Получение данных при обновлении
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);
////////////////////////// RETURNED PART ///////////////////////////////////////

  const getCorrectDate = useCallback((date) => {
    return window.Intl.DateTimeFormat('ru').format(date);
  }, [])

  if(!isAuthenticated) return <NotAuthenticated/>;

  if(loading || !state.firstName) return <Loader size="big"/>

    return (
      <div className="container user-page">
        <div className="head">
          <div>
            <h3>{`${state.firstName} ${state.lastName}`}</h3>
            <img alt="gender" src={state.gender === 'male' ? genderMale : genderFemale}/>
          </div>
          <h4>{state.grade}</h4>
        </div>
        <hr/>
        <div className='content'>
          <p><strong>Дата рождения: </strong>{`${getCorrectDate(state.birthdate)} (${getFullYears(state.birthdate)})`}</p>
          <p><strong>Электронная почта: </strong><a href={`mailto:${state.email}`}>{state.email}</a></p>
        </div>
        <div className="result">
          <h4>Пройденные тесты</h4>
          <div className="collection" onClick={e => e.preventDefault()}>
            {state.passedTests.map(item => {
              const date = new Date(item.date);
              return (
                <a key={item.resultId} href="/" data-test-name={item.name} data-test-id={item.resultId} onClick={handleTestClick} className="collection-item">
                  <div className="test-list">
                    <span className="name">{item.name}</span>
                    <strong className="date">{getCorrectDate(date)}</strong>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <ResultModalWindow
          modalRef={modal.ref}
          initialize={modal.initialize}
          content={modal.content}
          loading={modal.loading}
          closeWindow={modal.closeWindow}
          type={(modal.content && modal.content.userResultType) || 'basic'}
        />
      </div>   
    );
}