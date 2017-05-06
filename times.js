var FeedParser = require('feedparser');
var request = require('request');
var fs = require('fs');

var getData=function(){
  var req = request('http://timesofindia.indiatimes.com/rssfeedstopstories.cms')
  var feedparser = new FeedParser();

  req.on('error', function (error) {
    if(error) throw error;
  });

  req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'));
    }
    else {
      stream.pipe(feedparser);
    }
  });

  feedparser.on('error', function (error) {
  if(error) throw error;

  });

  feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;
    var object = {
      title:"",
      description:"",
      link:""
    }
    var array = [];
    while (item = stream.read()) {

        object.title = item.title;
        object.description = item.description;
        object.link = item.link;
        array.push(object);
        convert(array);
    }
  });

  req.on('error', function (error) {
    if(error) throw error;
  });
}

function convert(array)
{
    var jsonString=JSON.stringify({
      feedLines:array
    });
    console.log(jsonString);
    console.log(typeof(jsonString));

    return jsonString;
}
setInterval(getData,10*1000);

module.exports = getData;
