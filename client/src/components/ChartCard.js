import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

function random(min = 0, max = 1){
  max+=1;
  return(Math.floor(Math.random()*(max-min))+min)
}

export const ChartCard = props /* type, name, data, colors */ => {

//////////////////////////////Determine colors///////////////////////  
  let colors = props.color;
  if(!colors){
    const backgroundColor = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];
    const borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'];  
    colors = [];
    props.data.fields.forEach(() => {
      let number = random(0, props.data.fields.length-1);

      colors.push([backgroundColor[number], borderColor[number]]);

      backgroundColor.splice(number, 1);
      borderColor.splice(number, 1);
    })
  }
///////////////////////////////////////////////////////////////////// 

  const myChart = useRef(null);
  
  const data = props.data;

  useEffect(() => {
    const ctx = myChart.current.getContext('2d');

    const chart = new Chart(ctx, {
      label: data.name,
      type: data.type || 'doughnut',
      data: {
        labels: data.fields.map(field => field.title),
        datasets: [{
          label: data.name,
          data: data.fields.map(field => field.value),
          backgroundColor: colors.map(item => item[0]),
          borderColor: colors.map(item => item[1]),
          borderWidth: 1
        }],
      }   
    });
    return () => chart.destroy()
  }, [colors, data]);




  return (
    <div className="chart-instance chart-card card-panel">
      <h6>{data.name}</h6>
      <canvas ref={myChart}></canvas>
    </div>
  );
}