var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
      res.json({success: false, msg: 'Please fill the credentials.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.status(400).send({success: false, msg: 'Username already exists.'});
        }else{
        res.json({success: true, msg: 'Successful created new user.'});
      }
      });
    }
  });

  router.post('/login', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

  module.exports = router;