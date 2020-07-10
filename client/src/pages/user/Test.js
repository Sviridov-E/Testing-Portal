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
  const [ testIsAlreadyPassed, setTestIsAlreadyPassed ] = useState(false);

  const params = useParams();
  const history = useHistory();
  
  const { token, isAuthenticated } = useContext(AuthContext);

  const { request, loading } = useHttp();

  const fetchedData = useCallback(async () => {
    try {
      const data = await request(`/api/tests/${params.id}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      if(!data) return;
      
      // return {name, description, quantityOfQuestions, timeout}
      setData({name: data.name, description: data.description, quantityOfQuestions: data.quantityOfQuestions, timeout: data.timeout});
      setTestIsAlreadyPassed(data.testIsAlreadyPassed);
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
      timeout={data.timeout}
      returnToTestList={returnToTestList}
    /> : 
    <TestDescription 
      data={data} 
      clickStart={clickStart}
      testIsAlreadyPassed={testIsAlreadyPassed}
      returnToTestList={returnToTestList}
    /> 

  return content;
}