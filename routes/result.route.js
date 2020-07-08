const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const adminCheck = require('../middleware/adminCheck.middleware');
const Result = require('../models/Result');
const User = require('../models/User');

const router = Router();

router.get('/test/:testId', auth, async (req, res) => {
  // Result of test for user
  try {
    const userId = req.userId,
          testId = req.params.testId;

    const { users, name, userResultType, additionalInfo } = await Result.findOne({owner: testId}, 'users name userResultType, additionalInfo');

    const user = users.find(item => {
      
      if (item.owner == userId) return true;
      else return false;
    });
    const result = user.result;

    
    res.json({...result, title: name, userResultType, additionalInfo});

  } catch(e) {
    res.status(500).json({message: e.message});    
  }


} )
router.get('/test/:testId/:userId', auth, adminCheck, async (req, res) => {
  // Result of test for admin
  try {
    const userId = req.params.userId,
          testId = req.params.testId;

    const { users, name, userResultType, additionalInfo } = await Result.findOne({owner: testId}, 'users name userResultType additionalInfo');

    const user = users.find(item => {
      if (item.owner == userId) return true;
      else return false;
    });
    const result = user.result;
    const userName = user.name;    
    
    res.json({...result, title: name, id: userId, userName: userName, userResultType, additionalInfo});

  } catch(e) {
    res.status(500).json({message: e.message});    
  }
} )
router.get('/table/:testId', auth, adminCheck, async (req, res) => {
  // Results of test in table, for admin
  try {
    const query = req.query;
    const testId = req.params.testId;

    const { users, tableHead, additionalInfo } = await Result.findOne({owner: testId}, 'users tableHead additionalInfo');

    const usersArray = users.map(item => {
      return item.owner;
    });

    let profiles = await User.find({_id: {$in : usersArray}, ...query}, {firstName: true, lastName: true, gradeNumber: true, gradeLetter: true, gender: true});   

    profiles = profiles.map(profile => {
      const result = users.find(userResult => String(userResult.owner) === String(profile._id)).result;      
      return {...profile._doc, result: result.fieldsInArray};
    })    
    
    res.status(200).json({tableHead, profiles, additionalInfo});

  } catch(e) {
    res.status(500).json({message: e.message});
    console.log(e.message);
    
  }
})

module.exports = router;