//  Сложные аналогии
//  20 вопросов
//  5f070f52c15c2116a5033b80

module.exports = (answers, time) => {
    
    const standard = [4,1,5,0,5,0,3,5,2,3,4,1,5,0,3,5,2,4,1,2];

    let points=0, rating;

    answers.forEach((answer, ind) => {
        if(answer === standard[ind]) points++;
    })

    if(points >= 19) rating = 9;
    else if(points == 18) rating = 8;
    else if(points == 17) rating = 7;
    else if(points >= 15) rating = 6;
    else if(points >= 12) rating = 5;
    else if(points >= 10) rating = 4;
    else if(points >= 8) rating = 3;
    else if(points == 7) rating = 2;
    else if(points <= 6) rating = 1; 

    let resultTime = null;
    if(time) {
        resultTime = {
            title: 'Время прохождения',
            value: time
        }
    }

    return {
        scales: {
            title: 'Показатели',
            points: {
                title: 'Баллы',
                value: rating
            }
        },
        time: resultTime,
        fieldsInArray: [rating]
    }
}