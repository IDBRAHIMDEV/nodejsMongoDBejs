const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atosdb')
  .then(() => console.log('node connected with mongoDB...'))
  .catch(err => console.error(err.message));


const schema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User', schema);