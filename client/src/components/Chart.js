import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { ChartCard } from './ChartCard';
import { Loader } from '../components/Loader';

export const Chart = ({ testId, testName }) => {

  const [ chart, setChart] = useState(null);

  const { request, loading } = useHttp();

  const { token } = useContext(AuthContext);

  const fetchedData = useCallback(async () => {
    try {
      const data = await request(`/api/chart/${testId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setChart(data);
    } catch(e) {}

  }, [testId, request, token]);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  if(loading || !chart) return <Loader size="big"/>;

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