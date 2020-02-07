var TwitterPackage = require("twitter");
var request = require("request");

var secret = require("./config");

var Twitter = new TwitterPackage(secret);

Twitter.stream('statuses/filter', { track: 'paranaue' }, function (stream) {
    stream.on('data', function (tweet) {
        console.log('Stream: ', tweet.id, '\n', tweet.id_str)
        Twitter.post('statuses/update', { status: 'parana', in_reply_to_status_id: tweet.id_str, auto_populate_reply_metadata: true }, function (error, tweet, response) {
            if (error) console.log(error);
            console.log('Tweet ',tweet);  // Tweet body.
        });
// var randomAccomplishment  = array[Math.floor(Math.random() * array.length)];
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});