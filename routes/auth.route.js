const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('config');
const { selectFields } = require('express-validator/src/select-fields');

const router = Router();

router.post(
  '/register',[
    check('email', 'Некорректный адрес электронной почты').isEmail().normalizeEmail(),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6}).trim(),
    check('firstName', 'Имя не введено').notEmpty().trim().escape().customSanitizer(val => {
      return val[0].toUpperCase() + val.slice(1).toLowerCase();
    }),
    check('lastName', 'Фамилия не введена').notEmpty().trim().escape().customSanitizer(val => {
      return val[0].toUpperCase() + val.slice(1).toLowerCase();
    }),
    check('gradeNumber', 'Номер класса не введен').notEmpty().trim().escape(),
    check('gradeLetter', 'Буква класса не введена').notEmpty().trim().escape(),
    check('gender', 'Не выбран пол').notEmpty()
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({
          body: req.body,
          error: errors.array(),
          message: 'Некорректные данные'
        })
      }
      
      const { email, password, firstName, lastName, birthdate, gradeNumber, gradeLetter, gender } = req.body;

      const candidate = await User.findOne({email});
      if(candidate){
        return res.status(400).json({
          message: 'Такой пользователь уже существует'
        })
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        birthdate,
        gradeNumber,
        gradeLetter,
        gender,
        email: email.toLowerCase(),        
        password: hashedPassword,
      })
      await user.save();

      res.status(200).json({
        message: 'Пользователь создан'
      })


    } catch (e) {
      console.error('Registration error: ', e.message);
    }
  });
router.post('/login', [
  check('email', 'Некорректный адрес электронной почты').isEmail().normalizeEmail(),
  check('password', 'Пароль не введен').exists()
], async (req, res) => {
  try {        
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные'
      })
    }
    
    const { email, password } = req.body;
    
    
    const user = await User.findOne({email});

    if(!user){
      res.status(400).json({
        message: 'Такой пользователь не найден'

      })
    }
    
    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
      res.status(400).json({
        message: 'Неверный пароль'
      })
    }    
    const accessToken = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      config.get('accessSecret'),
      {
        expiresIn: '6h'
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      config.get('refreshSecret'),
      {
        expiresIn: '14 days'
      }
    );
    res.json({userId: user.id, isAdmin: user.isAdmin, accessToken, refreshToken});

  } catch (e) {
    console.error('Registration error: ', e.message);
  }

})

module.exports = router;