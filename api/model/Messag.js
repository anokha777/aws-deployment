const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  createorupdatetime: { type: Date, default: Date.now },
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageSchema);
