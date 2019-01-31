const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const noteSchema = mongoose.Schema({
  notetitle: { type: String, required: true, unique: true },
  notedescription: { type: String, required: true },
  iscompleted: { type: String, default: false },
  createorupdatetime: { type: Date, default: Date.now },
});

noteSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Note', noteSchema);
