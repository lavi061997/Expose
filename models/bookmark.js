var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;

var BookmarkSchema = mongoose.Schema{
  title:{
    type:String
  },

  description:{
    type:String
  },

  url:{
    type:String
  },

  username:{
    type:String
  }
}

var Bookmark = module.exports = mongoose.model('Bookmark',BookmarkSchema);

module.exports.addBookmark = function(newBookmark,callback)
{
		newBookmark.save(callback);
};

module.exports.deleteBookmark = function(id,callback)
{ var query = {
                  id:id
              }
      Bookmark.remove(query,callback);

}
