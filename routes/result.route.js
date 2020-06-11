const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const adminCheck = require('../middleware/adminCheck.middleware');
const Result = require('../models/Result');

const router = Router();

router.get('/:testId', auth, async (req, res) => {
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
router.get('/:testId/:userId', auth, adminCheck, async (req, res) => {
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

module.exports = router;