var Book=require('../models/Book')

exports.book_list=function(req,res){
    var token = getToken(req.headers);
    if (token) {
      Book.find(function (err, books) {
        if (err) return next(err);
        res.json(books);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
}