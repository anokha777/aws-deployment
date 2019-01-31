const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/04-mongo-flexbox-ajax-dom', { useNewUrlParser: true }, ((err) => {
// mongoose.connect('mongodb://localhost:27017/04-mongo-flexbox-ajax-dom', { useNewUrlParser: true }, ((err) => {
// mongoose.connect('mongodb+srv://Anokha:NBxyXa0FRCKYT05Q@cluster0-amm2q.mongodb.net/03-passport-mocha', { useNewUrlParser: true }, ((err) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('connected to db-');
  }
}));

module.exports = mongoose;
