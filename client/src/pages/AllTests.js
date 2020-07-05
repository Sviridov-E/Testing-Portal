import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { useHistory } from 'react-router-dom';

export const AllTests = () => {
  const [testsList, setTestsList] = useState([]);
  const history = useHistory();

  const { request, loading } = useHttp();
  const { token, isAdmin } = useContext(AuthContext);

  const fetchedTests = useCallback(async () => {
    try {
      const list = await request('/api/tests', 'GET', null, {
        Authorization: `Bearer ${token}`
      })      
      if(!list) return;
      
      setTestsList(list);
    } catch (e) {
      console.log(e);      
    }
  }, [token, request])

  useEffect(() => {
    fetchedTests();    
  }, [fetchedTests])

  const handleClick = e => {
    const id = e.target.closest('tr').dataset.id;
    const path = isAdmin ? `/tests/result/${id}` : `/tests/${id}`;
    history.push(path);
  }

  if(loading) {
    return <Loader size="big"/>
  }

  return (
    <div className="container tests-table">     
      <table className="highlight">
        <thead>
          <tr>
              <th>Название</th>
              <th>Вопросов</th>
          </tr>
        </thead>

        <tbody>
          {
            testsList.map(test => (
              <tr data-id={test._id} key={test._id} onClick={handleClick}>
                <td>{test.name}</td>
                <td>{test.quantityOfQuestions}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}