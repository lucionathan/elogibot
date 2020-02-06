var TwitterPackage = require("twitter");
var request = require("request");

var secret = require("./config");

var Twitter = new TwitterPackage(secret);

Twitter.stream('statuses/filter', { track: '"ai papai", laranja' }, function (stream) {
    stream.on('data', function (tweet) {
        console.log(tweet.text);
    });

    stream.on('error', function (error) {
        console.log(error.message);
    });
});