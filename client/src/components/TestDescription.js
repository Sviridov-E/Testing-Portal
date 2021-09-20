import React from 'react';

const showTime = time => {
  let min, sec;
  sec = (time / 1000) % 60;
  min = time > 60000 ? ((time / 1000) - sec) / 60 : 0;
  return `${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`
}

export const TestDescription = ({ data, clickStart, testIsAlreadyPassed, returnToTestList }) => (
  <div className="test-description">
    <div className="row">
      <h3 className="col s12 center">{data.name}</h3>
    </div>
    <div className="row">
      <p className="col s12 m8 offset-m2 l4 offset-l4">{data.description}</p>
    </div>
    {
      data.timeout && (
      <div className="row">
        <h6 className="col s12 m8 offset-m2 l4 offset-l4"><strong><span className="attention">Внимание! </span>Сдача теста ограничена по времени: </strong>{showTime(data.timeout)}</h6>
      </div>)
    }
    <div className="row">
      <p className="col s12 m8 offset-m2 l4 offset-l4"><strong>Количество вопросов: </strong>{data.quantityOfQuestions}</p>
    </div>
    <div className="row button">
      {
        testIsAlreadyPassed ?
        <>
          <div className="card-panel blue-grey lighten-4 already-passed">
            <strong className="black-text">Вы уже проходили этот тест.</strong>
          </div>
          <a href="/" onClick={returnToTestList} className="waves-effect waves-light btn-large indigo darken-1">Вернуться к списку</a>
        </> : 
        <a href="/" onClick={clickStart} className="waves-effect waves-light btn-large indigo darken-1">Начать тест</a>
      }
    </div>
  </div>
);