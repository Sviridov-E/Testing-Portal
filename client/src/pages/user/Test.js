import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/test.scss'
import { useParams, useHistory } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { TestDescription } from '../../components/TestDescription';
import { PassingTest } from '../../components/PassingTest';
import { NotAuthenticated } from '../../components/NotAuthenticated';

export const Test = () => {
  const [ data, setData ] = useState({});
  const [ testStarted, setTestStarted] = useState(false);
  const [ testFinished, setTestFinished ] = useState(false);

  const params = useParams();
  const history = useHistory();
  
  const { token, isAuthenticated } = useContext(AuthContext);

  const { request, loading } = useHttp();

  const fetchedData = useCallback(async () => {
    try {
      const data = await request(`/api/tests/${params.id}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      // return {name, description, quantityOfQuestions}
      setData(data);
    } catch (e) {
      console.log(e.message);      
    }
  }, [request, params, token])

  useEffect(() => {
    fetchedData();    
  }, [fetchedData])

  const clickStart = e => {
    e.preventDefault();
    setTestStarted(true);
  }
  const returnToTestList = e => {
    e.preventDefault();
    history.push('/tests');
  }

  if(loading){
    return (
      <Loader size="big"/>
    );
  }

  if(!isAuthenticated) return <NotAuthenticated/>

  let content = testStarted ? 
    <PassingTest 
      id={params.id} 
      name={data.name} 
      quantity={data.quantityOfQuestions}
      returnToTestList={returnToTestList}
    /> : 
    <TestDescription 
      data={data} 
      clickStart={clickStart}
      testFinished={testFinished}
      returnToTestList={returnToTestList}
    /> 

  return content;
}