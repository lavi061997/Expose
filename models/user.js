var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;

var UserSchema = mongoose.Schema({

 username:
 {
 	type:String,
 	index:true
 },

 email:
 {
 type:String
 },
 password:
 {
 	type:String,
 	required: true,
 	bcrypt:true
 },
 name:
 {
 type:String
 },
 profileImage:
 {
 type:String
 }

});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.ComparePassword =function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword,hash,function(err,isMatch){

		if(err) return callback(err);
		callback(null,isMatch);

	});
}

module.exports.getUserByUsername =function(username,callback){
	var query = {
		username:username

	}
	User.findOne(query,callback);
}
module.exports.getUserById =function(username,callback){
	var query = {
		username:username

	}
	User.findById(query,callback);

}
module.exports.createUser = function(newUser,callback)
{
	bcrypt.hash(newUser.password, 10 , function(error,hash){
		if(err) throw err;
		newUser.password = hash;
		newUser.save(callback);
});

}
