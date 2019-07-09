var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


passport.use(new FacebookStrategy({
    clientID: "885959325103932",
    clientSecret: "a255f3dacefa194e32e634e4d5b9d2e5",
    callbackURL: 'https://paulinelocapic.herokuapp.com/auth/facebook/callback',

    profileFields: ['id', 'first_name', 'last_name', 'email'],
    passReqToCallback: true

  },
  function(accessToken, refreshToken, profile, done) {


    var state = JSON.parse(req.query.state);

    var mergeData = {...profile._json, redirectUrl : state.redirectUrl};

    return done(null, mergeData);

  }));

app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
