var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookmark');
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
  }
}

var Bookmark = module.exports = mongoose.model('Bookmark',BookmarkSchema);
