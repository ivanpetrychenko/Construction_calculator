const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  id: {type: String, required: true, unique: true},
  value: {type: Number, default: 0}
});

module.exports = model('Square', schema);