//Include packages and keys
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
// console.log(keys);

var client = new Twitter(keys.twitter);
// console.log(keys.twitter);

var spotify = new Spotify(keys.spotify);
// console.log(keys.spotify);

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

//Twitter function
function getTweets() {
  //Grab username and store it in a variable called "params"
  var params = {
    screen_name: 'itsameND',
    count: 20
  };
  //Run a request to Twitter API
  client.get('statuses/user_timeline', params, function (err, tweets, response) {
    if (err) {
      return console.log(err);
    };
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
    };
  });
};

//Spotify function
function getSong() {
  //Grab song name and store it in a variable called "songName"
  var songName = process.argv.slice(3).join(' ');
  //Run request to Spotify API
  spotify.search({
    type: 'track',
    query: songName,
    limit: 3
  }, function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(data, null, 2));

    if (process.argv.slice(3) === ' ') {
      spotify.search({
        type: 'track',
        query: 'The Sign'
      }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data, null, 2));
      });
    };
  });
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

//Random function
function justDoIt() {
  //Reads random.txt file
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    // getSong();
  });
};