// Методика диагностики уровня школьной тревожности Филлипса
// 58 Вопросов
// 5f06410a2c9ce392c862370c

module.exports = answers => {

    const standard = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const scales = [
        {
            title: 'Общий показатель тревожности',
            variance: 0,
            total: 58
        },
        {
            title: 'Тревожность в школе',
            questionIndexes: [2, 3, 7, 12, 16, 21, 23, 26, 28, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
            variance: 0,
            total: 22
        },
        {
            title: 'Переживание социального стресса',
            questionIndexes: [5, 10, 15, 20, 24, 30, 33, 36, 39, 42, 44],
            variance: 0,
            total: 11
        },
        {
            title: 'Фрустрация потребности в достижение успеха',
            questionIndexes: [1, 3, 6, 11, 17, 19, 25, 29, 32, 35, 38, 41, 43],
            variance: 0,
            total: 13
        },
        {
            title: 'Страх самовыражения',
            questionIndexes: [27, 31, 34, 37, 40, 45],
            variance: 0,
            total: 6
        },
        {
            title: 'Страх ситуации проверки знаний',
            questionIndexes: [2, 7, 12, 16, 21, 26],
            variance: 0,
            total: 6
        },
        {
            title: 'Страх не соответствовать ожиданиям окружающих',
            questionIndexes: [3,8,13,17,22],
            variance: 0,
            total: 5
        },
        {
            title: 'Низкая физиологическая сопротивляемость стрессу',
            questionIndexes: [9,14,18,23,28],
            variance: 0,
            total: 5
        },
        {
            title: 'Проблемы и страхи в отношениях с учителями',
            questionIndexes: [2,6,11,32,35,41,44,47],
            variance: 0,
            total: 8
        },
    ];

    answers.forEach((answer, answerInd) => {
        const isMatched = answer === standard[answerInd] ? true : false;
        if(isMatched) return;
        scales[0].variance++;
        scales.forEach((scale, scaleInd) => {
            if(!scaleInd) return;
            if(scale.questionIndexes.includes(answerInd+1)){
                scale.variance++;
            }
        })
    })
    const fieldsInArray = [];
    const points = scales.map(scale => {
        const value = `${Math.round(scale.variance / scale.total * 100)}%`;
        fieldsInArray.push(value);
        return {
            title: scale.title,
            value
        }
    })
    const result = {
        scales: {
            title: 'Показатели',
            points
        },
        fieldsInArray
    }
    return result;
}