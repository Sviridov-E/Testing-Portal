import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { ChartCard } from './ChartCard';
import { Loader } from '../components/Loader';
import { ModalError } from './ModalError';
import { Refresh } from './Refresh';

export const Chart = ({ testId, testName }) => {

  const [ chart, setChart] = useState(null);

  const { request, loading, error, clearError } = useHttp();

  const { token } = useContext(AuthContext);

  const fetchedData = useCallback(async () => {
    try {
      const data = await request(`/api/chart/${testId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      
      setChart(data);
    } catch(e) {
      console.log(`error: ${e.message}`);
      
    }

  }, [testId, request, token]);

  useEffect(() => {
    fetchedData();
    return () => setChart(null);
  }, [fetchedData]);

  if(error) return <ModalError error={error} buttonClick={clearError}/>

  if(loading) return <Loader size="big"/>;

  if(!chart) return <Refresh action={fetchedData} size='big'/>;

  if(!chart.length) return <div className="chart"><h5 className="not-passed">Ни один ученик пока не прошел этот тест</h5></div>
  return (
    <div className="chart">
      <h5>{testName}</h5>
      <div className="cards">
        {
          chart.map((item, ind) => {
            return (
              <ChartCard
                key={ind}
                data={item}
              />
            );
          })
        }
      </div>
    </div>
  );
}