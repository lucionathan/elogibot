var TwitterPackage = require("twitter");
var request = require("request");

var secret = require("./config");

var Twitter = new TwitterPackage(secret);

Twitter.get('search/tweets', {q: '#teste', result_type:'recent'}, function(error, tweets, response) {
    console.log(tweets);
    tweets.statuses.forEach(function(tweet) {
        console.log("tweet: " + tweet.text);
    });
 });