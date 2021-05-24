const {Schema, model} = require('mongoose')

const schema = new Schema({
    login: String,
    password: String
});

module.exports = model('Admin', schema, "admin");