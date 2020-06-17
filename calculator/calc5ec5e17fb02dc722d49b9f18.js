module.exports = answers => {
  
  // 0 - 'Да', 1 - 'Нет'

  /*
  Экстраверсия — интроверсия: 
    больше 19 — яркий экстраверт,
    больше 15 — экстраверт,
    больше 12 — склонность к экстраверсии,
    12 — среднее значение,
    меньше 12 — склонность к интроверсии,
    меньше 9 — интроверт,
    меньше 5 — глубокий интроверт.
  Нейротизм:
    больше 19 — очень высокий уровень нейротизма,
    больше 13 — высокий уровень нейротизма,
    9 — 13 — среднее значение,
    меньше 9 — низкий уровень нейротизма.
  Ложь:
    больше 4 — неискренность в ответах, свидетельствующая также о некоторой демонстративности поведения и ориентированности испытуемого на социальное одобрение,
    меньше 4 — норма.
  */
  const counted = {
    extraversion: 0,
    neuroticism: 0,
    falsehood: 0
  }

  const extraversionEnumInc = `1, 3, 8, 10, 13, 17, 22, 25, 27, 39, 44, 46, 49, 53`.split(', '),
        extraversionEnumDec = `5, 15, 20, 29, 32, 34, 37, 41, 51`.split(', '),
        neuroticismEnumInc = `2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55, 57`.split(', '),
        falsehoodEnumInc = `6, 24, 36`.split(', '),
        falsehoodEnumDec = `12, 18, 30, 42, 48, 54`.split(`, `);

  extraversionEnumInc.forEach(quest => {
    if(!answers[quest-1]) counted.extraversion++;
  })

  extraversionEnumDec.forEach(quest => {
    if(answers[quest-1]) {
      counted.extraversion++;
    }
  })
  neuroticismEnumInc.forEach(quest => {
    if(!answers[quest-1]) counted.neuroticism++;
  })

  falsehoodEnumInc.forEach(quest => {
    if(!answers[quest-1]) counted.falsehood++;
  })

  falsehoodEnumDec.forEach(quest => {
    if(answers[quest-1]) counted.falsehood++;
  })
  
  function gradeOfExtraversion(points){
    if(points < 5) return 'Глубокий интроверт';
    if(points < 9) return 'Интроверт';
    if(points < 12) return 'Склонность к интроверсии';
    if(points === 12) return 'Среднее значение';
    if(points < 16 ) return 'Склонность к экстраверсии';
    if(points < 20 ) return 'Экстраверт';
    if(points >= 20 ) return 'Яркий экстраверт';
  }
  function gradeOfNeuroticism(points){
    if(points < 9) return 'Низкий уровень';
    if(points < 14) return 'Среднее значение';
    if(points < 20) return 'Высокий уровень';
    if(points >= 20) return 'Очень высокий уровень';
  }
  function countPersonalityType(){
    if(counted.extraversion >= 12){
      if(counted.neuroticism >= 11){
        return 'Холерик';
      } else {
        return 'Сангвиник';
      }
    } else {
      if(counted.neuroticism >= 11){
        return 'Меланхолик';
      } else {
        return 'Флегматик';
      }
    }
  }
  const result = {
    scales: {
      title: 'Показатели',
      extraversion: {
        title: 'Экстраверсия',
        points: {
          title: 'Баллов',
          value: counted.extraversion
        },
        get grade() {
          return {
            title: 'Степень',
            value: gradeOfExtraversion(this.points.value)
          }
        }
      },
      neuroticism: {
        title: 'Нейротизм',
        points: {
          title: 'Баллов',
          value: counted.neuroticism
        },
        get grade() {
          return {
            title: 'Степень',
            value: gradeOfNeuroticism(this.points.value)
          }
        }
      },
      falsehood: {
        title: 'Неискренность',
        points: {
          title: 'Баллов',
          value: counted.falsehood
        },
        grade: {
          title: 'Степень',
          value: counted.falsehood <= 4 ? 'Норма' : 'Неискренность в ответах'
        }
      }
    },
    personalityType: {
      title: 'Тип темперамента',
      value: countPersonalityType(),
    },
    get fieldsInArray(){
      return [
        `${this.scales.extraversion.points.value} (${this.scales.extraversion.grade.value})`,
        `${this.scales.neuroticism.points.value} (${this.scales.neuroticism.grade.value})`,
        `${this.scales.falsehood.points.value} (${this.scales.falsehood.grade.value})`,
        this.personalityType.value
      ]
    }
  }


  return result;
}


    /*value = [
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      1
    ]*/