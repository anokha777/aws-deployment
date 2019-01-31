const express = require('express');
const Slackcontroller = require('../controller/slack/slack-controller');

const router = express.Router();
// get slack page - channel page
// get channel page
router.route('/channel/page')
  .get(Slackcontroller.getChannelPage);

// get channel page
router.route('/channel/message/page')
  .get(Slackcontroller.getChannelMessagePage);

// get all channels, create channels
router.route('')
  .get(Slackcontroller.getChannels)
  .post(Slackcontroller.createChannel);

// get channel messages, create channel message
router.route('/channel/:id')
  .get(Slackcontroller.getChannelMessages)
  .post(Slackcontroller.createChannelMessage);

// get messages, create message
// router.route('/message')
//   .get(Slackcontroller.getMessage)
//   .post(Slackcontroller.createMessage);

module.exports = router;
