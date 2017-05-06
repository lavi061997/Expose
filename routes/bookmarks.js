var express = require('express');
var flash  = require('connect-flash');
var router = express.Route();
var User = require('../models/user');
var Bookmark = require('../models/bookmark');

router.get('/:username',function(res,req,error){
    Bookmark.find({username:req.params.username}, function(err, bookmark) {

    res.render('bookmarks',{title:'Bookmarks',
  'Bookmark':bookmark});

});


router.post('/add',function(res,req,next){

            var title = req.body.title;
            var description = req.body.description;
            var url = req.body.url;
            var username = req.body.username;
      var newBookmark = new Bookmark({
            title:title,
            description:desciption,
            url:url,
            username:username
      });


      Bookmark.addBookmark(newBookmark,function(err,bookmark){
            if(err) {throw err;}
            console.log(bookmark);

        });
        req.falsh('Bookmark Added!');
    }

});


router.post('/delete/:id',function(res,req,next){
      Bookmark.deleteBookmark(req.params.id,function(err){
          if(err){
            throw err;
          }
          req.flash("Deleted");
      });


    });
