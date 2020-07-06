// Опросник Леонгарда – Шмишека
// 5ef55e7a23cbc81c58416f1c
// 88 Вопросов

const Result = require('../models/Result');
const User = require('../models/User');
const config = require('config');

function getGradeIndex(val) {
    if(val < 13) return 0;
    if(val < 19) return 1;
    return 2;
}

module.exports = async () => {

    const testId = config.testsId.accentuation;

    const { users } = await Result.findOne({owner: testId}, 'users');

    if(!users.length) return null;

    const totalUsers = await User.countDocuments();
    const scales = ['Гипертимность', 'Ригидность', 'Эмотивность', 'Педантичность', 'Тревожность', 'Циклотимичность', 'Демонстративность', 'Возбудимость', 'Дистимичность', 'Аффективность'];
    const result = scales.map(name => ({
        name,
        type: '',
        fields: [
            {
                title: 'Свойство не выражено',
                value: 0
            },
            {
                title: 'Средняя степень',
                value: 0
            },
            {
                title: 'Акцентуированная черта',
                value: 0
            },
        ]
    }));

    users.forEach(user => {
        const fields = user.result.scales.points;
        fields.forEach(({value}, ind) => {
            result[ind].fields[getGradeIndex(value)].value++;
        })
    })

    return result;
}