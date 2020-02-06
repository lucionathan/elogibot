var TwitterPackage = require("twitter");
var request = require("request");

var secret = require("./config");

var Twitter = new TwitterPackage(secret);