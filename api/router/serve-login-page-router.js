const express = require('express');
const Usercontroller = require('../controller/user/user-controller');

const router = express.Router();

// get login page and user login
router.route('')
  .get(Usercontroller.getLoginPage);

module.exports = router;
