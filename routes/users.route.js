const { Router } = require('express');
const User = require('../models/User')
const adminCheck = require('../middleware/adminCheck.middleware');

const router = Router();

router.get('/', adminCheck, async (req, res) => {
  try {
    const params = req.query;
    
    const users = await User.find(params, 'firstName lastName gender gradeLetter gradeNumber email');
    res.json(users);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

router.get('/profile', async (req, res) => {
  try {
    const id = req.userId;

    const { firstName, lastName, gender, gradeNumber, gradeLetter, email, birthdate, passedTests } = await User.findById(id, {
      firstName: true,
      lastName: true,
      gender: true,
      gradeNumber: true,
      gradeLetter: true,
      email: true,
      birthdate: true,
      passedTests: true
    });    

    const tests = passedTests.map(item => {
      return {
        name: item.name,
        resultId: item.owner,
        date: item.date
      }
    })

    res.json({
      firstName,
      lastName,
      birthdate,
      email,
      gender,
      grade: `${gradeNumber} ${gradeLetter}`,
      passedTests: tests
    });
  } catch (e) {
    res.status(500).json({message: e.message});
  }
})
router.get('/profile/:id', adminCheck, async (req, res) => {
  try {
    const id = req.params.id;

    const { firstName, lastName, gender, gradeNumber, gradeLetter, email, birthdate, passedTests } = await User.findById(id, {
      firstName: true,
      lastName: true,
      gender: true,
      gradeNumber: true,
      gradeLetter: true,
      email: true,
      birthdate: true,
      passedTests: true
    });    

    const tests = passedTests.map(item => {
      return {
        name: item.name,
        resultId: item.owner,
        date: item.date
      }
    })

    res.json({
      firstName,
      lastName,
      birthdate,
      email,
      gender,
      grade: `${gradeNumber} ${gradeLetter}`,
      passedTests: tests
    });
  } catch (e) {
    res.status(500).json({message: e.message});
  }
})

module.exports = router;