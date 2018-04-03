//Include packages and keys
require('dotenv').config();
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");
// console.log(keys);

// console.log(process.env.SPOTIFY_CLIENTID);
// console.log(process.env.SPOTIFY_CLIENTSECRET);
// console.log(process.env.TWITTER_CONSUMER_KEY);
// console.log(process.env.TWITTER_CONSUMER_SECRET);
// console.log(process.env.TWITTER_ACCESS_TOKEN_KEY);
// console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET);

var spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENTID,
  secret: process.env.SPOTIFY_CLIENTSECRET
});

var input = process.argv[2];

switch (input) {
  case 'my-tweets':
    getTweets();
    break;
  case 'spotify-this-song':
    getSong();
    break;
  case 'movie-this':
    getMovieInfo();
    break;
  case 'do-what-it-says':
    justDoIt();
    break;
  default:
    console.log("You didn't put in a proper input. Please use 'my-tweets', 'spotify-this-song', 'movie-this',or 'do-what-it-says'.");
    break;
};

//OMDB function
function getMovieInfo() {
  // Grab or assemble the movie name and store it in a variable called "movieName"
  var movieName = process.argv.slice(3).join(' ');

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  /*request(urlBeingRequested, callback(err, responseObj, dataReturned))*/
  request(queryUrl, function (err, response, data) {
    if (!err && response.statusCode === 200) {
      console.log(JSON.parse(data));
      console.log('=============');
      console.log(JSON.parse(data).Title);
      console.log(JSON.parse(data).Year);
      console.log(JSON.parse(data).Ratings[0]);
      console.log(JSON.parse(data).Ratings[1]);
      console.log(JSON.parse(data).Country);
      console.log(JSON.parse(data).Language);
      console.log(JSON.parse(data).Plot);
      console.log(JSON.parse(data).Actors);
    }
  });
};