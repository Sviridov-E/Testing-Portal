const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  birthdate: {type: Date, required: true},
  gradeNumber: {type: Number, required: true},
  gradeLetter: {type: String, required: true},
  gender: {type: String, required: true},
  passedTests: [{
    owner: {type: Types.ObjectId, ref: 'Test'},
    result: {type: Types.ObjectId, ref: 'Result'},
    date: {type: Date, default: Date.now},
    name: String // Название теста
  }]
})

module.exports = model('User', schema);