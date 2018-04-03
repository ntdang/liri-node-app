require('dotenv').config();
var Spotify = require('node-spotify-api');

console.log(process.env.SPOTIFY_CLIENTID);
console.log(process.env.SPOTIFY_CLIENTSECRET);
console.log(process.env.TWITTER_CONSUMER_KEY);
console.log(process.env.TWITTER_CONSUMER_SECRET);
console.log(process.env.TWITTER_ACCESS_TOKEN_KEY);
console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET);

var spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENTID,
  secret: process.env.SPOTIFY_CLIENTSECRET
});