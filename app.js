const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const dbConnection = require('./db/db-connections');
const userRouter = require('./api/router/user-router');
const noteRouter = require('./api/router/note-router');
const trelloRouter = require('./api/router/trello-router');
const slackRouter = require('./api/router/slack-router');
const serveLoginPageRouter = require('./api/router/serve-login-page-router');
const User = require('./api/model/User');
const opts = require('./api/auth/jwt-token-generator');
// const User = require('./model/user');
// const passport = require('./auth/passport-auth');
// const isLoggedin = require('./auth/auth');

app.use(passport.initialize());

passport.use(new JwtStrategy(opts.opts, (payload, done) => {
  User.findOne({ username: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

// middleware
app.use(morgan('dev'));
app.use(bodyParser({ urlEncoded: { extended: true } }));

// CORS issue, allowed methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// serve login page
app.use('/', serveLoginPageRouter);
// login and registration
app.use('/user', userRouter);
// api - note
app.use('/api/note', passport.authenticate('jwt', { session: false }), noteRouter);
// api - trello
app.use('/api/trello', passport.authenticate('jwt', { session: false }), trelloRouter);
// api - slack
app.use('/api/slack', passport.authenticate('jwt', { session: false }), slackRouter);

app.use((error, req, res, next) => {
  if (error) res.status(500).send('Some error occured', error);
  next();
});

app.use((req, res) => {
  res.status(404).send('NOT Found.');
});

const server = app.listen(port, () => {
  let temp = dbConnection;
  temp = 0;
  console.log('Server started at port- ', port, temp);
});

passport.serializeUser((user, done) => {
// eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }, (err, user) => {
    if (err) {
      throw err;
    } else {
      done(null, user);
    }
  });
});

module.exports = server;
