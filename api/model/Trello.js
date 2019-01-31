const mongoose = require('mongoose');

const cardItemSchema = new mongoose.Schema({
  carditem: { type: String },
  createorupdatetime: { type: Date, default: Date.now },
});

const cardSchema = new mongoose.Schema({
  cardtitle: { type: String },
  carddescription: { type: String },
  createorupdatetime: { type: Date, default: Date.now },
  carditems: [cardItemSchema],
});

// const memberSchema = new mongoose.Schema({
//   userid: { type: String },
//   createorupdatetime: { type: Date, default: Date.now },
// });

const boardSchema = mongoose.Schema({
  boardtitle: { type: String, required: true },
  boarddescription: { type: String, required: true },
  createorupdatetime: { type: Date, default: Date.now },
  cards: [cardSchema],
  members: [],
});

module.exports = mongoose.model('Trello', boardSchema);
