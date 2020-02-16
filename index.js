var TwitterPackage = require("twitter");

var secret = require("./config");

var elogios = require('./elogios.json'); 

var Tweets = require('./tweets.json').tweets;

var Twitter = new TwitterPackage(secret);


function classificaString(tweet){ 

    var retorno = "";
    var substrings = ["feia", "feio", "burra", "burro", "insuficiente"]
    tweet.split(' ').forEach(element => {
        substrings.forEach(substring => {
            if(substring == element) {
                retorno = element;
            }
        });
    });

    return retorno;
}

function getRandomElogio(elogios) {
    return elogios[Math.floor(Math.random() * elogios.length)];
}


function getElogio(elogios, classificacao) {

    var retorno = "";

    switch (classificacao) {
        case "feio":
            retorno = getRandomElogio(elogios.masculino_aparencia);
            break;
    
        case "burro":
            retorno = getRandomElogio(elogios.masculino_inteligencia); 
            break;
   
        case "feia":
            retorno = getRandomElogio(elogios.feminino_aparencia); 
            break;
            
        case "burra":
            retorno = getRandomElogio(elogios.feminino_inteligencia); 
            break;
            
        case "insuficiente":
            retorno = getRandomElogio(elogios.suficiencia); 
            break;
        }
    
    return retorno;

}


Twitter.stream('statuses/filter', { track: Tweets}, function (stream) {
    stream.on('data', function (tweet) {
        if(tweet.retweeted_status == undefined && !tweet.is_quote_status && tweet.in_reply_to_status_id == null) {
            console.log(tweet.text);

            var elogio = getElogio(elogios, classificaString(tweet.text));

            Twitter.post('statuses/update', { status: elogio, in_reply_to_status_id: tweet.id_str, auto_populate_reply_metadata: true }, function (error, tweet, response) {
                if (error) console.log(error);
            });
        }

    });

    stream.on('error', function (error) {
        console.log(error);
    });
});
