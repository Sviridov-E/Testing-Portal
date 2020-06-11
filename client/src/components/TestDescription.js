import React from 'react';

export const TestDescription = ({ data, clickStart, testFinished, returnToTestList }) => (
  <div className="test-description">
    <div className="row">
      <h3 className="col s12 center">{data.name}</h3>
    </div>
    <div className="row">
      <p className="col s4 offset-s4">{data.description}</p>
    </div>
    <div className="row">
      <p className="col s4 offset-s4"><strong>Количество вопросов: </strong>{data.quantityOfQuestions}</p>
    </div>
    <div className="row center">
      {
        testFinished ?
        <>
          <h6>Вы уже проходили этот тест</h6>
          <a href="/" onClick={returnToTestList} className="waves-effect waves-light btn-large indigo darken-1">Вернуться к списку</a>
        </> : 
        <a href="/" onClick={clickStart} className="waves-effect waves-light btn-large indigo darken-1">Начать тест</a>
      }
    </div>
  </div>
);