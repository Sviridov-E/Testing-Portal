//  Сложные аналогии
//  20 вопросов
//  5f070f52c15c2116a5033b80

const config = require('config');
const Result = require('../models/Result');

module.exports = async () => {
    const testId = config.get('testsId.difficultAnalogies');

    const { users } = await Result.findOne({owner: testId}, 'users');
    
    const result = [{
        name: 'Распределение по баллам',
        type: 'line',
        fields: [
            {
                title: '1',
                value: 0
            },
            {
                title: 2,
                value: 0
            },
            {
                title: 3,
                value: 0
            },
            {
                title: 4,
                value: 0
            },
            {
                title: 5,
                value: 0
            },
            {
                title: 6,
                value: 0
            },
            {
                title: 7,
                value: 0
            },
            {
                title: 8,
                value: 0
            },
            {
                title: 9,
                value: 0
            }
        ]
    }]

    users.forEach(user => {
        const point = user.result.fieldsInArray[0];
        
        result[0].fields[point-1].value++;
    })
    return result;
}