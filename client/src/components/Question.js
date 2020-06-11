import React, { useState } from 'react';
import { Loader } from './Loader';

export const Question = ({ question, answerTheQuestion, nextQuestion, questionsLeft, finishTest }) => {

  const [ answerNum, setAnswerNum ] = useState(null);

  if(!question) {
    return (
      <Loader/>
    );
  }

  const selectHandler = e => {
    setAnswerNum(+e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    if(answerNum === null){
      return window.M.toast({html: "Необходимо выбрать ответ"});
    }
    answerTheQuestion(answerNum);
    setAnswerNum(null);
    if(questionsLeft === 1){
      finishTest();
    } else {
      nextQuestion();
    }
  }

  return (
    <div className="questions">
      <h6>{question.title}</h6>
      <form onSubmit={submitHandler}>
        {
          question.answers.map((answer, ind) => (
            <p key={ind} className="question">
              <label>
                <input value={ind} name="answer" type="radio" onChange={selectHandler} checked={ind === answerNum ? true : false}/>
                <span>{answer}</span>
              </label>
            </p>
          ))
        }
        <button className="btn waves-effect waves-light indigo darken-1" type="submit">{questionsLeft - 1 ? `Следующий` : `Завершить`}
          <i className="material-icons right">fast_forward</i>
        </button>
      </form>
      <h6 className="stats">Осталось вопросов: <strong>{questionsLeft}</strong></h6>
    </div>
  );
}