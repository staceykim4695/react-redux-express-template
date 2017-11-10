const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');
const bodyParser = require('body-parser');
const User = require('./models').User;

var session = require('cookie-session');
app.use(session({ secret: 'secret'}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Find a user by id and call done(null, user)
  User.findById(id)
    .then((user) => {
      // console.log(user);
      done(null, user)
    })
});

passport.use(new LocalStrategy(function(username, password, done) {
  // Find a user by username, if password matches call done(null, user)
  // otherwise call done(null, false)
  User.findOne({ where: { username: username }})
    .then((user) => {
    // if no user present, auth failed
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  })
  .catch(err => done(err));
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api(passport));

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
