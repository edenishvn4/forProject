var mongoose = require('mongoose');
var CartSchema = new mongoose.Schema({
    isbn:String,
    username:String,
    title: String,
    description: String,
    qty: { type:Number, default:0},
    price:Number,
    stock:Number
  });

  module.exports = mongoose.model('Cart', CartSchema);