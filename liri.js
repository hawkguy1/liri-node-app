require("dotenv").config();

var command = process.argv[2];
var nodeArgs = process.argv;
var searchInput = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        searchInput = searchInput + "+" + nodeArgs[i];
    }
    else {
        searchInput += nodeArgs[i];
    }
}

if (command === "concert-this") {
    concertThis();
}

else if (command === "spotify-this-song") {
    spotifySong();
}

else if (command === "movie-this") {
    movieThis();
}

else if (command === "do-what-it-says") {
    doWhatItSays();
}

// ----- CONCERT-THIS ----- //
function concertThis() {
    var request = require("request");
    var moment = require('moment');

    var queryUrl = "https://rest.bandsintown.com/artists/" + searchInput + //"/events?app_id=codingbootcamp";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var data = JSON.parse(body);
                for (var i = 0; i < data.length; i++) {
                    console.log("VENUE NAME: " + (data[i].venue.name));
                    console.log("VENUE LOCATION: " + (data[i].venue.city) + ", " + (data[i].venue.region));
                    console.log("DATE OF THE EVENT: " + moment(data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY").toString());
                }
            }
        });
}

// ----- SPOTIFY-THIS-SONG ----- //
function spotifySong() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: //"b204db9fe42b49e592da5f2c39d33d70",
            secret//"576ee2ed7d71475897adb2701cc10a27"
    });
    if (searchInput === "") {
        searchInput = "The Sign";
    }
    spotify.search({ type: 'track', query: searchInput }, function (err, data) {
        if (err) {
            return console.log("ERROR OCCURRED: " + err);
        }
        else {
            var dataString = JSON.stringify(data);
            var datainfo = JSON.parse(dataString);
            for (var i = 0; i < datainfo.tracks.items.length; i++) {
                for (var j = 0; j < datainfo.tracks.items[i].artists.length; j++) {
                    console.log("ARTISTS: " + datainfo.tracks.items[i].artists[j].name);
                }
                console.log("SONG NAME: " + datainfo.tracks.items[i].name);
                console.log("PREVIEW LINE: " + datainfo.tracks.items[i].preview_url);
                console.log("ALBUM: " + datainfo.tracks.items[i].album.name);
            }
        }
    });
}

// ----- MOVIE-THIS ----- //
function movieThis() {
    var request = require("request");
    var queryUrl = "http://www.omdbapi.com/?t=" + searchInput +// "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (searchInput === "") {
                    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                    console.log("It's on Netflix!");
                }
                else {
                    var data = JSON.parse(body);
                    console.log("MOVIE: " + data.Title);
                    console.log("YEAR RELEASED: " + data.Year);
                    console.log("IMDB RATING: " + data.imdbRating);
                    console.log("ROTTEN TOMATOES RATING: " + data.Ratings[1].Value);
                    console.log("COUNTRY PRODUCED IN: " + data.Country);
                    console.log("LANGUAGE: " + data.Language);
                    console.log("PLOT: " + data.Plot);
                    console.log("ACTORS: " + data.Actors);
                }
            }
        });
}

// ----- DO-WHAT-IT-SAYS ----- //
function doWhatItSays() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr[1].substr(1, dataArr[1].length - 2));
            var newArry = dataArr[1].substr(1, dataArr[1].length - 2).split(" ");
            for (var i = 3; i < newArry.length; i++) {
                if (i > 3 && i < newArry.length) {
                    searchInput = searchInput + "+" + newArry[i];
                }
                else {
                    searchInput += newArry[i];
                }
            }
            if (dataArr[0] === "concert-this") {
                concertThis();
            }
            else if (dataArr[0] === "spotify-this-song") {
                spotifySong();
            }
            else if (dataArr[0] === "movie-this") {
                movieThis();
            }
        }
    });
}
