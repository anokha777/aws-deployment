const jwt = require('jsonwebtoken');
const ExtractJwt  = require('passport-jwt').ExtractJwt;

// module.exports = function getJWTToken({ audience, issuer, secretOrKey }, subject) {
//   return jwt.sign({}, secretOrKey, {
//     audience, issuer, expiresIn: '10d', subject,
//   });
// };

module.exports = function getJWTToken({ audience, issuer, secretOrKey }, subject) {
  return new Promise((resolve, reject) => {
    if (audience) {
      resolve(jwt.sign({}, secretOrKey, {
        audience, issuer, expiresIn: '10d', subject,
      }));
    } else {
      reject('There is error while generating auth token');
    }
  });
};


module.exports.opts = {
  audience: 'my-test.server.com',
  issuer: 'my-test.server.com',
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
