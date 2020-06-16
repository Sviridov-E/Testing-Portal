import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import '../../styles/users.scss';
import { UserTable } from '../../components/UserTable';
import { UserFilter } from '../../components/UserFilter';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Users = () => {
  const { token } = useContext(AuthContext);
  const [ usersList, setUsersList ] = useState([]);
  const queryString = useLocation().search;
  const [ requestParams, setRequestParams ] = useState({
    firstName: null,
    lastName: null,
    gradeNumber: null,
    gradeLetter: null,
    age: null,
    gender: null,
  })
  const { request, loading } = useHttp();

  const fetchedUsers = useCallback( async query => {
    try {
      const users = await request(`/api/users${query}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });      
      setUsersList(users);
    } catch (e) {
      console.log(e.message);      
    }

  }, [request, token])

  useEffect(()=>{    
    fetchedUsers(queryString);
  }, [fetchedUsers, queryString]);

  return (
    <>
    <UserFilter
      requestParams={requestParams}
      setRequestParams={setRequestParams}
    />
    <UserTable
      usersList={usersList}
      setUsersList={setUsersList}
      loading={loading}
    />
    </>
  );
}