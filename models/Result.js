const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  owner: {type: Types.ObjectId, require: true}, // id пользователя
  name: {type: String, default: 'User Name'}, // имя пользователя
  date: {type: Date, default: Date.new}, // дата прохождения
  result: {type: Object, requre: true}, // объект с результатом
  testingTime: {type: Number, default: null} // время сдачи теста в мс
})

const resultSchema = new Schema({
  owner: {type: Types.ObjectId, required: true}, //id теста
  name: {type: String, default: 'Test Name'}, // имя теста
  tableHead: {type: Array}, // массив имен столбцов для таблицы результатов
  userResultType: {type: String, default: null}, // тип представления результатов теста на странице пользователя
  additionalInfo: {type: Object, default: null}, // Дополнительная информация к результатам теста 
  users: [userSchema] // массив с результатами пользователей
})

module.exports = model('Result', resultSchema);