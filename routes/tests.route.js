const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const Test = require('../models/Test');
const User = require('../models/User');
const Result = require('../models/Result');
const { Types } = require('mongoose');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find({}, {name: true, quantityOfQuestions: true});
    
    res.json(tests);
    
  } catch (e) {
    res.status(500).json({message: 'Ошибка при подключении к базе данных'});
  }

})
router.get('/:id', auth, async (req, res) => {
  // Описание теста
  try {
    const testId = req.params.id;
    const {name, description, quantityOfQuestions} = await Test.findById(testId, {name: true, description: true, quantityOfQuestions: true, _id: false});
   
    const { passedTests } = await User.findById(req.userId, {passedTests: true});
    
    const testIsAlreadyPassed = passedTests.findIndex(item => String(item.owner) === testId) !== -1 ? true : false;
        
    res.json({name, description, quantityOfQuestions, testIsAlreadyPassed});
  } catch (e) {
    res.status(500).json({message: 'Ошибка при подключении к базе данных'});
  }
})

router.get('/passing/:id', auth, async (req, res) => {
  // Вопросы теста
  try {
    const testId = req.params.id;
    const { passedTests } = await User.findById(req.userId, {passedTests: true, _id: false});
    
    if(passedTests.includes(testId)){
      return res.status(400).json({message: 'This test is alredy passed'});
    }

    const { questions } = await Test.findById(testId, {questions: true, _id: false});
    res.json(questions);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
})

router.post('/passing/:id', auth, async (req, res) => {
  // Сохранение результатов теста
  try {
    const testId = req.params.id;
    const user = await User.findById(req.userId, {passedTests: true, firstName: true, lastName: true});    

    const testIsAlreadyPassed = user.passedTests.findIndex(item => String(item.owner) === testId) !== -1 ? true : false;

    if(testIsAlreadyPassed){
      return res.status(400).json({message: 'Данный тест уже пройден'});
    }

    const calculator = require(`../calculator/calc${testId}`); // Функция высчитвает результат теста, и возвращает результат
    const calculated = calculator(req.body.answers);    

    let result = await Result.findOne({owner:testId}, {users: true, name: true}); // Находим документ с результатами необходимого теста
    if(!result) {
      const { name } = await Test.findById(testId, 'name');
      result = new Result({name: name, owner: testId});        
    }
    const resultId = Types.ObjectId();
    const date = new Date();
    result.users.push({_id: resultId, owner: req.userId, name: `${user.firstName} ${user.lastName}`, result: calculated, date: date}); // Добавляем результаты в документ
    await result.save();

    user.passedTests.push({owner: testId, result: resultId, name: result.name, date: date});
    await user.save();

    res.json(calculated);
    
  } catch (e) {
    console.log(e);
    
    res.status(500).json({message: e.message})
  }
})

module.exports = router;