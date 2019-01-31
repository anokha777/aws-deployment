const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const channeslMsgSchema = new mongoose.Schema({
  chmessage: { type: String },
  createorupdatetime: { type: Date, default: Date.now },
});

const channelSchema = mongoose.Schema({
  channeltitle: { type: String, required: true },
  channeldescription: { type: String, required: true },
  createorupdatetime: { type: Date, default: Date.now },
  chmessage: [channeslMsgSchema],
});

// channelSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Channel', channelSchema);
