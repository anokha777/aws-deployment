const path = require('path');
const Chennel = require('../../model/Channel');

// get slack channel page
exports.getChannelPage = (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/slack/channels.html'));
  } catch (error) {
    next(error);
  }
};

// get channel's message page
exports.getChannelMessagePage = (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/slack/messages.html'));
  } catch (error) {
    next(error);
  }
};

exports.getChannels = (req, res, next) => {
  Chennel.find().then((channels) => {
    if (channels.length > 0) {
      res.status(201).send({
        channels,
      });
    } else {
      res.status(404).json({
        message: 'No record found',
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: 'No record found',
    });
    next(error);
  });
};

exports.createChannel = (req, res, next) => {
  const channel = new Chennel({
    channeltitle: req.body.channeltitle,
    channeldescription: req.body.channeldescription,
    createorupdatetime: Date.now(),
  });
  channel.save().then((createdChannel) => {
    res.status(201).send({
      message: 'Channel created successfully',
      createdChannel,
    });
  }).catch((error) => {
    next(error);
  });
};

exports.getChannelMessages = (req, res, next) => {
  Chennel.find({ _id: req.params.id }).then((channel) => {
    if (channel.length > 0) {
      res.status(201).send({
        channel,
      });
    } else {
      res.status(404).json({
        message: `No channel found with id- ${req.params.id}`,
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: `No channel found with id- ${req.params.id}`,
    });
    next(error);
  });
};

exports.createChannelMessage = (req, res, next) => {
  Chennel.findOne({ _id: req.params.id }).then((channel) => {
    if (channel) {
      channel.chmessage.push({
        chmessage: req.body.chmessage,
        createorupdatetime: Date.now(),
      });
      channel.save().then(() => {
        Chennel.findOne({ _id: req.params.id }).then((updatedChannel) => {
          res.status(200).json({
            message: 'Message posted successfully to channel.',
            updatedChannel,
          });
        });
      });
    } else {
      res.status(404).json({
        message: `No channel found with id- ${req.params.id}. to post message - stage 1`,
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: `No channel found with id- ${req.params.id}. to post message - stage 2`,
    });
    next(error);
  });
};
