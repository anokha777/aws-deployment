const express = require('express');
const Usercontroller = require('../controller/user/user-controller');

const router = express.Router();

// get login page and user login
// router.route('')
//   .get(Usercontroller.getLoginPage);

// login
router.route('/login')
  .post(Usercontroller.userLogin);
// logout
router.route('/logout')
  .get(Usercontroller.userLogout);
// home page
router.route('/home')
  .get(Usercontroller.userHome);

// logout
// router.route('/logout').get(Usercontroller.logout);

// get registration page
router.route('/registerform').get(Usercontroller.getRegistrationPage);

// user registration
router.route('/register').post(Usercontroller.userRegistration);

module.exports = router;
