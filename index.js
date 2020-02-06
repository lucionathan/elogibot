var TwitterPackage = require("twitter");
var request = require("request");

var secret = require("./config");

var Twitter = new TwitterPackage(secret);

// var randomAccomplishment  = array[Math.floor(Math.random() * array.length)];

Twitter.stream('statuses/filter', { track: 'tu ta de paparote'}, function (stream) {
    stream.on('data', function (tweet) {
        console.log(tweet.text);
        console.log(tweet.id_str);

        Twitter.post('statuses/update', {
            status:'elogio', 
            in_reply_to_status_id: tweet.id_str
        });


    });

    stream.on('error', function (error) {
        console.log(error.message);
    });
});