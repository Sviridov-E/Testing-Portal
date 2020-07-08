import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Question } from './Question';
import { Loader } from './Loader';

export const PassingTest = ({ id, name, quantity, returnToTestList }) => {
  const [ questions, setQuestions ] = useState([]),
        [ , setAnswers ] = useState([]),
        [ questionId, setQuestionId ] = useState(0),
        [ testFinished, setTestFinished ] = useState(false),
        [ savingResult, setSavingResult] = useState(false);

  const { request } = useHttp();

  const { token } = useContext(AuthContext);

  const fetchedQuestions = useCallback(async () => {
    try {
      
      const questions = await request(`/api/tests/passing/${id}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      if(!questions) return;
      // returns an array of questions with name, answers and id

      setQuestions(questions);
    } catch (e) {
      console.log(e.message);      
    }
  }, [id, request, token]);

  const nextQuestion = () => {
    setQuestionId(id => id + 1);
  }

  const finishTest = () => {
    try {
      setAnswers(async answers => {
        if(answers.length !== quantity) {
          throw new Error('Не хватает ответов');
        }
        setSavingResult(true);
        await request(`/api/tests/passing/${id}`, 'POST', {answers}, {
          Authorization: `Bearer ${token}`
        });
        setSavingResult(false);
        setTestFinished(true);
        return [];
      })      
    } catch(e) {
      console.log('Ошибка при сохранении результата: ', e.message);      
    }
  }

  const answerTheQuestion = answer => {
    setAnswers(answers => {
      return answers.concat([answer]);
    })
  }

  useEffect(() => {
    fetchedQuestions();
  }, [fetchedQuestions])

  if(testFinished){
    return (
      <div className="passing-test">
        <div className="row test-description">
          <h3 className="col s12 center">{name}</h3>
        </div>
        <div className="row">
          <div className="col s6 offset-s3 center">
            <h5>Результат сохранен!</h5>
            <p>Результаты теста вы можете посмотреть в личном кабинете</p>
            <a href="/" onClick={returnToTestList} className="waves-effect waves-light btn-large indigo darken-1">Вернуться к списку тестов</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="passing-test">
      <div className="row test-description">
        <h3 className="col s12 center">{name}</h3>
      </div>
      <div className="row">
        <div className="col s6 offset-s3 question">
          {          
            savingResult ? 
            <div className='center'>
              <h5>Результат сохраняется, подождите...</h5>
              <Loader/>
            </div>
            :
            <Question 
              question={questions[questionId]}
              answerTheQuestion={answerTheQuestion}
              nextQuestion={nextQuestion}
              finishTest={finishTest}
              questionsLeft={quantity-questionId}         
            />
          }
        </div>
      </div>
    </div>

  );
}