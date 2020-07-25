const {Schema, model} = require('mongoose');

const confirmSchema = new Schema({
    email: {type: String, require: true},
    hash: {type: String, require: true}
})

module.exports = model('Confirm', confirmSchema);