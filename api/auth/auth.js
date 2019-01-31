const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const apiRoute = jsonServer.router(path.resolve(__dirname, 'db.json'));
const jsonServerMiddleware = jsonServer.defaults();

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  audience: 'my-app.com',
  issuer: 'my-app.com',
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const users = {
  admin: {
    name: 'Super Admin',
    email: 'abcd@example.com',
  },
};

passport.use(new JwtStrategy(opts, (payload, done) => {
  const username = payload.sub;
  // retrieve the user object
  if (users[username]) {
    done(null, users[username]);
  } else {
    done(null, false);
  }
}));


const app = express();
app.use('/api', jsonServerMiddleware);
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoute);
