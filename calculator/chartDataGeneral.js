const User = require('../models/User');
const Result = require('../models/Result');

module.exports = async () => {
  const amountOfUsers = await User.countDocuments() - 1;
      const users = await User.find({isAdmin: false}, {gender: true, gradeNumber: true, passedTests: true});
      const amountOfTests = await Result.countDocuments();
      
      const distributionByGrade = users.reduce((prevValue, user) => {
        if(prevValue[user.gradeNumber] && prevValue[user.gradeNumber].value){
          prevValue[user.gradeNumber].value++;
        } else {
          prevValue[user.gradeNumber] = {
            value: 1,
            title: `${user.gradeNumber} Класс`
          }
        }
        return prevValue;
      }, {});

      const amountOfPassedTests = users.reduce((prevValue, user) => prevValue + user.passedTests.length, 0);

      const amountOfMale = users.filter(item => item.gender === "male").length;
      
      const diagrams = [
        {
          name: 'Всего пройдено тестов',
          type: '',
          fields: [
            {
              title: 'Пройдено тестов',
              value: amountOfPassedTests
            },
            {
              title: 'Осталось пройти',
              value: amountOfTests * amountOfUsers - amountOfPassedTests
            }
          ],
          totalAmount: amountOfTests * amountOfUsers
        },
        {
          name: 'Соотношение классов',
          // Количество в каждом классе / общее количество
          type: '',
          fields: Object.values(distributionByGrade),
          totalAmount: amountOfUsers      
        },
        {
          name: 'Соотношение учениц и учеников',
          // М(Ж) / общее количество
          type: '',
          fields: [
            {
              title: 'Учеников',
              value: amountOfMale
            },
            {
              title: 'Учениц',
              value: amountOfUsers - amountOfMale
            }
          ],
          totalAmount: amountOfUsers          
        }
      ];

      return diagrams;
    }