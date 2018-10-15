var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var book = require('./routes/book');
var auth = require('./routes/auth');
var cart = require('./routes/cart');
var hist = require('./routes/hist');
var app = express();

const cors = require('cors');
const url = 'mongodb://edenishvn4:Irshakun29!@ds029595.mlab.com:29595/mern-secure' //'mongodb://expirs:291189@localhost:27017/mern-new'

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(url, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));


app.use(cors());
app.use('/api/book', book);
app.use('/api/auth', auth);
app.use('/api/cart', cart);
app.use('/api/hist', hist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(process.env.PORT || 3002,()=>{
    console.log("listening to @port 3002....")
})