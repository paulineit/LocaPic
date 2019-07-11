var express = require('express');
var router = express.Router();

var passport = require('passport');

var userModel = require('../models/users')

router.get('/auth/facebook', function (req, res, next) {
  passport.authenticate(
    'facebook', { scope: 'email', state: JSON.stringify(req.query) }
  )(req, res, next);
});

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),

  function (req, res) {
    res.redirect(req.user.redirectUrl
      + "?userId=" + req.user.id
      + "&firstName=" + req.user.first_name
      + "&lastName=" + req.user.last_name
      + "&email=" + req.user.email);
  });

router.post('/logPosition', function (req, res, next) {
  userModel.findOne(
    {
      facebookid: req.body.facebookid
    },
    (err, user) => {
      console.log("LOG: user IN DB ->", user)
      if (user) {
        user.historiquePosition.push({
          latitude: req.body.latitude,
          longitude: req.body.longitude
        })
        user.save()
      } else {
        var newUser = new userModel({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          facebookid: req.body.facebookid,
        })
        newUser.save((err, user) => {
          console.log("NEW USER SAVE ->", user)
        })
        res.json({ result: true });
      }
    }
  )
})

router.get('/logPosition', function (req, res) {
  UserModel.findOne({ facebookid: req.query.facebookid }, function (err, user) {
    if (user) {
      res.json({ historiquePosition: user.historiquePosition });
    } else {
      res.json({ historiquePosition: [] });
    }
  })
}
)

module.exports = router;
