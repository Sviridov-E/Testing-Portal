import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { Chart } from '../../components/Chart';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/result.scss';

export const Result = () => {
  const selectorRef = useRef(null);

  const [testsList, setTestsList] = useState([]);
  const [test, setTest] = useState({
    id: '',
    name: 'Общая информация'
  });

  const { request, loading } = useHttp();

  const { token } = useContext(AuthContext);

  const fetchedTestsList = useCallback(async () => {
    try {
      const tests = await request(`/api/tests`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      if(!tests) return;
      setTestsList(tests);
    } catch(e) {}
  }, [request, setTestsList, token]);

  useEffect(() => {
    fetchedTestsList();
  }, [fetchedTestsList]);

  useEffect(() => {
    const selector = selectorRef.current;
    window.M.FormSelect.init(selector);
  }, [testsList]);

  const handleSelect = event => {
    if(!event.target.value){
      return setTest({id: '', name: 'Общая информация'});
    }
    const id = testsList[event.target.value]._id;
    const name = testsList[event.target.value].name;
    setTest({id, name});
  }
  if(!testsList) return <></>;
  const selector = loading ? (
    <select onChange={handleSelect} ref={selectorRef}>
      <option value="">Общая информация</option>
    </select>
  ) : (
    <select onChange={handleSelect} ref={selectorRef}>
      <option value="">Общая информация</option>
      {
        testsList.map(({name}, ind) => <option key={ind} value={ind}>{name}</option>)
      }
    </select>
  );
  
  return (
    <div className="container result">
      <div className="header">
        <h3>Общие результаты</h3>
        <div className="input-field">
          {
            selector
          }
          <label>Выбрать статистику</label>
        </div>
      </div>
      <hr/>
      <Chart
        testId={test.id}
        testName={test.name}
      />
    </div>
  );
}