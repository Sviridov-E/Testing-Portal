import React, { useState, useCallback, useContext, useEffect } from 'react';
import { UserFilter } from '../../components/UserFilter';
import { ResultTable } from '../../components/ResultTable';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Refresh } from '../../components/Refresh';

const TestResult = () => {
  const [requestParams, setRequestParams] = useState({
    gradeNumber: null,
    gradeLetter: null,
    gender: null
  });
  const [tableData, setTableData] = useState({
    tableHead: null,
    profiles: null
  });
  const [requestHasBeenSent, setRequestHasBeenSent] = useState(false);

  const location = useLocation();
  const queryString = location.search;
  const testId = location.pathname.slice(-24);

  const {request, loading} = useHttp();

  const {token} = useContext(AuthContext);

  const fetchedResult = useCallback(async query => {
    try {
      const data = await request(`/api/result/table/${testId}${query}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      if(!data) return;
      const profiles = data.profiles.map(profile => {
        return {
          _id: profile._id,
          values: [
            profile.firstName,
            profile.lastName,
            `${profile.gradeNumber} ${profile.gradeLetter}`,
            ...profile.result
          ]
        }
      });

      setTableData({
        tableHead: [].concat(['Имя', 'Фамилия', 'Класс'], data.tableHead),
        profiles: profiles
      });
    } catch (e) {
      console.log(e.message);     
    }
  }, [request, token, testId])

  useEffect(()=>{
    if(!requestHasBeenSent) return;
    fetchedResult(queryString);    
  }, [fetchedResult, queryString, requestHasBeenSent]);

  let data = requestHasBeenSent ?
    <ResultTable
      tableData={tableData}
      setTableData={setTableData}
      loading={loading}
    /> :
    <Refresh
      action={()=>{setRequestHasBeenSent(true)}}
      size="big"
    />

  return (
    <>
      <UserFilter
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        whereSearchButtonClick={()=>{setRequestHasBeenSent(true)}}
        params={[
          'gradeNumber',
          'gradeLetter',
          'gender'
        ]}
      />
      {data}
    </>
  )
}

export default TestResult;