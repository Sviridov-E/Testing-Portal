const Result = require('../models/Result');
const User = require('../models/User');

function countFields(fields, result) {
  if(fields.has(result.value)){
    fields.set(result.value, fields.get(result.value)+1);
  } else {
    fields.set(result.value, 1);
  }
}

function getArrayFromMap(map) {
  const result = [];
  const entries = map.entries();

  for (const [key, value] of entries) {
    result.push({
      title: key,
      value: value
    })
  }
  return result;
}

module.exports = async () => {
  const totalAmountOfUsers = await User.countDocuments();

  const temperament = {
    name: 'Распределение по темпераменту',
    type: '',
    fields: new Map(),
    totalAmount: totalAmountOfUsers
  };

  const testedStudents = {
    name: 'Ученики прошедшие тест',
    type: '',
    fields: null,
    totalAmount: totalAmountOfUsers
  };

  const distrOfExtraversion = {
    name: 'Распределение по экстраверсии',
    type: '',
    fields: new Map(),
    totalAmount: totalAmountOfUsers
  };

  const distrOfNeuroticism = {
    name: 'Распределение по нейротизму',
    type: '',
    fields: new Map(),
    totalAmount: totalAmountOfUsers
  };

  const distrOfFalsehood = {
    name: 'Распределение по неискренности',
    type: '',
    fields: new Map(),
    totalAmount: totalAmountOfUsers
  };

  const { users } = await Result.findOne({owner: '5ec5e17fb02dc722d49b9f18'}, 'users');

  testedStudents.fields = [{title: 'Прошли тест', value: users.length}, {title: 'Не прошли тест', value: totalAmountOfUsers - users.length}];

  users.forEach(({result}) => {
    countFields(temperament.fields, result.personalityType);
    countFields(distrOfExtraversion.fields, result.scales.extraversion.grade);
    countFields(distrOfNeuroticism.fields, result.scales.neuroticism.grade);
    countFields(distrOfFalsehood.fields, result.scales.falsehood.grade);
  });

  const result = [
    testedStudents,
    temperament,
    distrOfExtraversion,
    distrOfNeuroticism,
    distrOfFalsehood
  ];
  
  
  result.forEach((item, ind) => {
    if(!ind) return;
    result[ind].fields = getArrayFromMap(item.fields);
  })

  return result;
}