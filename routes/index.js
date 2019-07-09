var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LocaPic' });
});


router.get('/auth/facebook',
function(req,res,next) {
  passport.authenticate('facebook', { scope: 'email',state: JSON.stringify(req.query) }
      )
    (req,res,next);
    }
  );


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),

  function(req, res) {
    res.redirect(res.redirect(req.user.redirectUrl
      +"?userId="+req.user.id
      +"&firstName="+req.user.first_name
      +"&lastName="+req.user.last_name
      +"&email="+req.user.email);
  }
);


module.exports = router;
