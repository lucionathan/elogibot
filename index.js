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


function getElogio(elogios, classificacao) {

    var retorno = "";

    switch (classificacao) {
        case "feio":
            retorno = elogios.masculino.aparencia[Math.floor(Math.random() * elogios.masculino.aparencia.length)];
            break;
    
        case "burro":
            retorno = elogios.masculino.inteligencia[Math.floor(Math.random() * elogios.masculino.inteligencia.length)];
            break;
   
        case "feia":
            retorno = elogios.feminino.aparencia[Math.floor(Math.random() * elogios.masculino.aparencia.length)];
            break;
            
        case "burra":
            retorno = elogios.feminino.inteligencia[Math.floor(Math.random() * elogios.masculino.inteligencia.length)];
            break;
            
        case "insuficiente":
            retorno = elogios.insuficiente[Math.floor(Math.random() * elogios.insuficiente.length)];
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