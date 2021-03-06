var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

/*  GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	res.render('register',{
		'title' : 'Register'
	})
});

router.get('/login', function(req, res, next) {
	res.render('login',{
		'title' : 'Login'
	})
});

router.post('/register',function(req,res,next){

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;



if(req.files.profileimage){

	console.log('uploading file');
	var profileImageOriginalName = req.files.profileimage.originalname;
	var profileImageName = req.files.profileimage.name;
	var profileImageOriginalMime = req.files.profileimage.mimetype;
	var profileImageOriginalPath = req.files.profileimage.path;
	var profileImageOriginalExt = req.files.profileimage.extension;
	var profileImageOriginalSize = req.files.profileimage.size;
}
else{
	var profileImageName = 'noimage.png';
}
//form validation

req.checkBody('name','Name field is required').notEmpty();

req.checkBody('email','Email field is required').notEmpty();

req.checkBody('email','Email not valid').isEmail();

req.checkBody('username','Username field is required').notEmpty();

req.checkBody('password','Password field is required').notEmpty();

req.checkBody('password2','Password do not match').equals(req.body.password);

var errors = req.validationErrors();

if(errors){
	res.render('/register',{
		errors:errors,
		name: name,
		email:email,
		username:username,
		password:password,
		password2:password2
	});
}
else {
	var newUser = new User({
		name: name,
		email:email,
		username:username,
		password:password,
		password2:password2
	});

}
User.createUser(newUser,function(err,user){
if(err) throw err;
console.log(user);
});

req.flash('You may Login Now');

res.location('/');
res.redirect('/');

});
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(
	function(username,password,done){
				User.getUserByUsername(username,function(err,user){
						if(err) throw err;
						if(!user)
						{
							console.log('Unknown User');
							return done(null,false,{message:'Unknown User'});
						}

				});
				User.comparePassword(password,user.password,function(err,isMatch){
					if(err) throw err;
					if(isMatch){
					return done(null,user);
				}
					else{
						console.log('Invalid Password');
						return done(null,false,{message:'Invalid password'});
					}
			});



		}
));

router.post('/login',passport.authenticate('local', { successRedirect: '/',failureRedirect: 'users/login',failureFlash:'NOOB'}),function(req,res){
	console.log('authenticate success');
	req.flash('success','logged in');
});


router.get('/logout',function(req,res){

	req.logout();

	req.flash('success','you have logout');
	res.redirect('/users/logout')
});

module.exports = router;
