import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { UserFilter } from '../../components/UserFilter';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ResultTable } from '../../components/ResultTable';

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
      if(!users) return;

      const tableData = {
        profiles: users.map(user => ({
          _id: user._id,
          values: [
            user.firstName,
            user.lastName,
            user.gradeNumber,
            user.gradeLetter,
            user.gender === 'male' ? 'M' : 'Ж',
            user.email
          ]
        })),
        tableHead: [
          'Имя',
          'Фамилия',
          'Класс',
          'Буква',
          'Пол',
          'Почта',
        ]
      }
      setUsersList(tableData);
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
    <ResultTable
      tableData={usersList}
      setTableData={setUsersList}
      loading={loading}
    />
    </>
    /*
  Таблица принимает два пропса, tableData u loading. TableData - объект, содержащий два поля:
    profiles: представляет массив из объектов, в каждом объекте обязательно должно быть поле '_id', чтобы осуществлять редирект на страницы пользователей
  а также должно быть поле 'values' - массив со значениями, порядок значений в массиве должен быть такой же как в tableHead
    tableHead: массив со значениями, которые будут представлять колонки в таблице

  Значение loading - логическое, индицирует готовность данных.
*/
  );
}