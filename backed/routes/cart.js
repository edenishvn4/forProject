var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cart = require('../models/Cart.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL BOOKS */
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Cart.find({username:req.params.id},function (err, cart) {
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
      Cart.findOne({username:req.body.username,title:req.body.title},function (err, cart) {
        if (!cart) {
          Cart.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
          });
        }else{
          return res.status(400).send({success:false,msg:'this item has been added'});
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Cart.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  router.delete('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Cart.remove({username:req.body.username}, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  module.exports = router;