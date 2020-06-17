const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const adminCheck = require('../middleware/adminCheck.middleware');
const Result = require('../models/Result');
const User = require('../models/User');

const router = Router();

router.get('/test/:testId', auth, async (req, res) => {
  try {
    const userId = req.userId,
          testId = req.params.testId;

    const { users, name } = await Result.findOne({owner: testId}, 'users name');

    const user = users.find(item => {
      
      if (item.owner == userId) return true;
      else return false;
    });
    const result = user.result;
    const userName = user.name;
    console.log(`id`, userId);
    console.log('name', userName);


    
    res.json({...result, title: name});

  } catch(e) {
    res.status(500).json({message: e.message});    
  }


} )
router.get('/test/:testId/:userId', auth, adminCheck, async (req, res) => {
  try {
    const userId = req.params.userId,
          testId = req.params.testId;

    const { users, name } = await Result.findOne({owner: testId}, 'users name');

    const user = users.find(item => {
      if (item.owner == userId) return true;
      else return false;
    });
    const result = user.result;
    const userName = user.name;
    console.log(`id`, userId);
    console.log('name', userName);
    
    
    res.json({...result, title: name, id: userId, userName: userName});

  } catch(e) {
    res.status(500).json({message: e.message});    
  }
} )
router.get('/table/:testId', auth, adminCheck, async (req, res) => {
  /*
  1. Делаем запрос к документу Result, c ID нужного теста и достаем от туда поле users, и какие поля для таблицы нужны;
  2. Формируем массив с айдишниками users;
  3. Делаем запрос к документу Users, запрашиваем документы с айдишниками и строкой query;
  4. Отправляем клиенту имя, фамилию, класс, пол, и столбцы результатов
  */
  try {
    const query = req.query;
    const testId = req.params.testId;

    const { users, tableHead } = await Result.findOne({owner: testId}, {users: true, tableHead: true});

    const usersArray = users.map(item => {
      return item.owner;
    });

    let profiles = await User.find({_id: {$in : usersArray}, ...query}, {firstName: true, lastName: true, gradeNumber: true, gradeLetter: true, gender: true});   

    profiles = profiles.map(profile => {
      const result = users.find(userResult => String(userResult.owner) === String(profile._id)).result;      
      return {...profile._doc, result: result.fieldsInArray};
    })    
    
    res.status(200).json({tableHead, profiles});

  } catch(e) {
    res.status(500).json({message: e.message});
    console.log(e.message);
    
  }
})

module.exports = router;