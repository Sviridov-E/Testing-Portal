// Опросник Леонгарда – Шмишека
// 88 Вопросов
module.exports = answers => {

  const answersYes = [ [1, 11, 23, 33, 45, 55, 67, 77], [2, 15, 24, 34, 37, 56, 68, 78, 81], [3, 13, 35, 47, 57, 69, 7], [4, 14, 17, 26, 39, 48, 58, 61, 70, 80, 83], [16, 27, 38, 49, 60, 71, 82], [6,18,28,40,50,62,72,84], [7, 19, 22, 29, 41, 44, 63, 66, 73, 85, 88], [8, 20, 30, 42, 52, 64, 74, 86], [9, 21, 43, 75, 87], [10, 32, 54, 76]];
  const answersNo = [ [], [12, 46, 59], [25], [36], [5], [], [51], [], [31, 53, 65], []];
  const factors = [3,2,3,2,3,3,2,3,3,6]; // Множители
  const fieldsInArray = new Array(10).fill(0)

  const accentuation = [
    'Гипертимность',
    'Ригидность',
    'Эмотивность',
    'Педантичность',
    'Тревожность',
    'Циклотимичность',
    'Демонстративность',
    'Возбудимость',
    'Дистимичность',
    'Аффективность'  
  ];

  answers.forEach((answer, index) => {
    answer = !answer;
    index++;
    if(answer) {
      let scaleNumber = null;
      for (let i = 0; i < answersYes.length; i++) {
        if(answersYes[i].includes(index)){
          scaleNumber = i;
          break;
        }
      }
      if(scaleNumber === null) return;
      fieldsInArray[scaleNumber]+= factors[scaleNumber];
    } else {
      let scaleNumber = null;
      for (let i = 0; i < answersNo.length; i++){
        if(answersNo[i].includes(index)){
          scaleNumber = i;
          break;
        }
      }
      if(scaleNumber === null) return;
      fieldsInArray[scaleNumber]+= factors[scaleNumber];
    }
  })

  const scales = fieldsInArray.map((points, ind) => ({
    title: accentuation[ind],
    value: points
  }))

  return {
    scales: {
      title: 'Показатели',
      points: scales
    },
    fieldsInArray,
  }
}