const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  count: {type: String, required: true},
  unit: {type: String, required: true},
  id: {type: String, required: true, unique: true},
});

module.exports = model('Operation', schema);