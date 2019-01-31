const path = require('path');
const User = require('../../model/User');
const userformView = require('../../view/user/user-view');
const getJWTToken = require('../../auth/jwt-token-generator');
const opts = require('../../auth/jwt-token-generator');

exports.getLoginPage = (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/user/login.html'));
  } catch (error) {
    next(error);
  }
};

exports.getRegistrationPage = ((req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/user/registration.html'));
  } catch (error) {
    next(error);
  }
});

// exports.getLoginPage = (req, res, next) => {
//   try {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(userformView.loginform);
//     res.end();
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getRegistrationPage = ((req, res, next) => {
//   try {
//     // res.writeHead(200, { 'Content-Type': 'text/html' });
//     // res.write(userformView.registrationForm);
//     // res.end();
//     res.status(200).json({
//       message: 'rendering registration page',
//       htmlTeplate: userformView.registrationForm,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

exports.userRegistration = ((req, res, next) => {
  try {
    User.find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          res.status(409).json({
            message: 'User exists',
            htmlTeplate: `<div>User - ${req.body.username} already exists.</div>`,
          });
        }
        const loggedinUser = new User({
          username: req.body.username,
          password: req.body.password,
        });
        loggedinUser.save().then((result) => {
          res.status(200).json({
            message: 'User created',
            userid: result.username,
            htmlTeplate: userformView.successregistration,
          });
        })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
  } catch (error) {
    next(error);
  }
});

// exports.userLogin = (req, res, next) => {
//   User.find({ username: req.body.username })
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: 'Auth failed',
//         });
//       }
//       /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
//       const token = '';// jwt.sign({ username: user[0].username, userId: user[0]._id }, 'This_is_jwt_secret', { expiresIn: '1h' });
//       return res.status(200).json({
//         message: 'Auth successful',
//         token,
//       });
//     })
//     .catch((error) => {
//       res.status(401).json({
//         message: 'Auth failed',
//       });
//       next(error);
//     });
// };

exports.userLogin = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      getJWTToken(opts.opts, user[0].username).then((token) => {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        return res.status(200).json({
          message: 'Auth successful',
          token,
        });
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: 'Auth failed',
      });
      next(error);
    });
};

exports.userLogout = ((req, res, next) => {
  try {
    req.logout();
    res.sendFile(path.join(__dirname, '../../../public/static/html/user/login.html'));
  } catch (error) {
    next(error);
  }
});

exports.userHome = ((req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/user/home.html'));
  } catch (error) {
    next(error);
  }
});

// exports.userHome = (req, res, next) => {
//   try {
//     console.log('I am in home222 -------------');
//     // res.sendFile(path.join(__dirname, '../../../public/static/html/user/login.html'));
//     res.sendFile(path.join(__dirname, '../../../public/static/html/user/home.html'));
//     console.log('I am in home333 -------------');
//   } catch (error) {
//     next(error);
//   }
// };
