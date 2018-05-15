var mongoose = require('mongoose');
var HistorySchema = new mongoose.Schema({
    username:String,
    title: Array,
    qty: Array,
    price:Number,
    buy_date: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('History', HistorySchema);