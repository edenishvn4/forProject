var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cart = require('../models/Cart.js');
var Hist = require('../models/History.js')
var passport = require('passport');
require('../config/passport')(passport);

router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Hist.find({username:req.params.id},function (err, cart) {
        if (err) return next(err);
        res.json(cart);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Hist.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

module.exports = router;