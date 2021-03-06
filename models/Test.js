const { Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String},
  quantityOfQuestions: {type: Number},
  timeForPassing: {type: Number, default: null},
  questions: [{
    title: {type: String},
    answers: [String]
  }],
})

module.exports = model('Test', schema);