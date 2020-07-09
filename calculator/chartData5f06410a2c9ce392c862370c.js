// Методика диагностики уровня школьной тревожности Филлипса
// 58 Вопросов
// 5f06410a2c9ce392c862370c

const config = require('config');
const Result = require('../models/Result');

module.exports = async () => {
    const testId = config.get('testsId.diagnosisOfAnxiety');

    const { users } = await Result.findOne({owner: testId}, 'users');

    const scales = ["Общий показатель тревожности", "Тревожность в школе", "Переживание социального стресса", "Фрустрация потребности в достижение успеха", "Страх самовыражения", "Страх ситуации проверки знаний", "Страх не соответствовать ожиданиям окружающих", "Низкая физиологическая сопротивляемость стрессу", "Проблемы и страхи в отношениях с учителями"];
    const result = scales.map(name => ({
        name,
        type: '',
        fields: [
            {
                title: 'Отсутствует проявление',
                value: 0
            },
            {
                title: 'Повышенная тревожность',
                value: 0
            },
            {
                title: 'Высокая тревожность',
                value: 0
            },
        ]
    }));

    users.forEach(user => {
        const fields = user.result.fieldsInArray;
        fields.forEach((value, ind) => {
            const num = parseInt(value);
            const chart = result[ind];
            if(num < 50) return chart.fields[0].value++;
            if(num < 75) return chart.fields[1].value++;
            if(num <= 100) return chart.fields[2].value++;
        })
    })
    return result;
}

