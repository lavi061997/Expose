var express=require("express");
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
var multer = require('multer');
var upload = multer({ dest: './public/uploads'});
var fs = require('fs');
var count = 0;

var storage = multer.diskStorage({
destination: function (req, file, callback) {
  callback(null, '../uploads');
},
filename: function (req, file, callback)
{
  callback(null, file.fieldname + '-' + Date.now() + id + count++);
}
});
var upload = multer({ storage : storage}).single('userVideo');


router.post('/add/:id',function(res,req){
  var id = req.params.id;

  upload(req,res,id,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
  });
});


router.get('/uploads/:id',function(res,req){
    var id = req.params.id;
    var array = fs.readfiles
}


















});
