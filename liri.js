require("dotenv").config()
var fs = require("fs")
var request = require('request');
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var userInput = process.argv.splice(3).join(" ")
console.log(userInput)

// link to api keys.js file
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


function twitterFunc() {
  var params = { Jonatha93940597: "nodejs", count: 20 };
  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
      tweets.forEach(function (tweet) {
        console.log(tweet.text)
      })
    }
  })
}

if (process.argv[2] === `my-tweets`) {
  twitterFunc()
}


function spotifyFunc() {
  if(!userInput) {
    userInput = "The Sign"
  }
  spotify.search({ type: 'track', query: userInput })
    .then(function (response) {
      var song = response.tracks.items[0].name
      console.log(song)
      var artist = response.tracks.items[0].artists[0].name
      console.log(artist)
      var album = response.tracks.items[0].album.name
      console.log(album)
      var preview = response.tracks.items[0].preview_url
      console.log(preview)


    })
}
if (process.argv[2] === `spotify-this-song`) {

  spotifyFunc()

}

function ombdFunc() {
  if(!userInput) {
    userInput = "Mr. Nobody"
  }


var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"

  request(queryURL, function (error, response, body) {
  
    if (!error && response.statusCode === 200) {
      var movieObj = JSON.parse(body)
      // console.log(movieObj)
      var title = movieObj.Title
      console.log("Title: " + title)
      var year = movieObj.Year
      console.log("Year: " + year)
      var rating = movieObj.Rated
      console.log("Rating: " + rating)
      var rotten = movieObj.Ratings[1].Value
      console.log("Rotten Tomato Score: " + rotten)
      var country = movieObj.Country
      console.log("Countries: " + country)
      var language = movieObj.Language
      console.log("Language: " + language)
      var plot = movieObj.Plot
      console.log("Plot: " + plot)
      var actors = movieObj.Actors
      console.log("Actors: " + actors) 
      
    }

  })
}

if (process.argv[2] === `movie-this`) {

  ombdFunc()

}

if (process.argv[2] === `do-what-it-says`) {

  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err)
    } else {
      console.log(data)
      var commandArr = data.split(",")
      console.log(commandArr)

      userInput = commandArr[1]
      if (commandArr[0] === "my-tweets") {
        twitterFunc()
      }
      else if (commandArr[0] === "spotify-this-song") {
        spotifyFunc()
      }
      else if (commandArr[0] === "movie-this") {
        ombdFunc()
      }
      else {
        console.log("This is not a valid command")
      }

    }


  })

}
