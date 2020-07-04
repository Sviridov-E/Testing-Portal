// Анкета школьной мотивации Н.Г. Лускановой

const Result = require('../models/Result');
const User = require('../models/User');
const config = require('config');

module.exports = async () => {
    try {
        const testId = config.testsId.motivation;        
        
        const { users } = await Result.findOne({owner: testId}, 'users');        
        
        if(!users.length) return []; // Ни один человек не сдал тест, результатов нет

        const totalUsers = await User.countDocuments();

        const result = [
            {
                title: 'Ученики прошедшие тест',
                type: '',
                fields: [
                    {
                        title: 'Прошли тест',
                        value: users.length
                    },
                    {
                        title: 'Не прошли тест',
                        value: totalUsers - users.length
                    }
                ]
            },
            {
                title: 'Распределение по мотивации',
                type: '',
                fields: new Map([
                    ['Школьная дезадаптация', 0],
                    ['Низкая школьная мотивация', 0],
                    ['Внешняя мотивация', 0],
                    ['Хорошая школьная мотивация', 0],
                    ['Максимально высокая мотивация', 0],
                ]),
            }
        ]

    users.forEach(user => {
        const value = user.result.scales.grade.value;
        let prevValue = result[1].fields.get(value);
        result[1].fields.set(value, ++prevValue);
    });

    result[1].fields = Array.from(result[1].fields.entries()).map(([title, value]) => ({
        title,
        value
    }))

    return result;
    

    } catch(e) {
        console.log(e.message);
        throw e;        
    }

}
