// Анкета школьной мотивации Н.Г. Лускановой
// 5ef4eb6a112d7f219c29b449

module.exports = answers => {
  const A = 3, B = 1, C = 0;

  const sum = answers.reduce((lastAnswer, answer) => {
    switch(answer) {
      case 0:
        return lastAnswer + A;
      case 1: 
        return lastAnswer + B;
      case 2:
        return lastAnswer + C;
      default:
        throw new Error({message: 'Ошибка при подсчете результата'});
    }
  }, 0);

  let grade;
  if(sum < 10) grade = 'Школьная дезадаптация';
  if(sum >= 10 && sum < 15) grade = 'Низкая школьная мотивация';
  if(sum >= 15 && sum < 20) grade = 'Внешняя мотивация';
  if(sum >= 20 && sum < 25) grade = 'Хорошая школьная мотивация';
  if(sum >= 25) grade = 'Максимально высокая мотивация';
  
  const result = {
    scales: {
      title: 'Показатели',
      points: {
        title: 'Баллов',
        value: sum
      },
      grade: {
        title: 'Мотивация',
        value: grade
      }
    },
    fieldsInArray: [
      sum,
      grade
    ]
  }

  return result;
}

