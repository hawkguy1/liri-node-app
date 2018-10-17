require("dotenv").config();

// ----- NODE SEARCH STRING ----- //
var nodeString = process.argv;
var nodeSearch = "";
for (var i = 3; i < nodeString.length; i++) {
    if (i > 3 && i < nodeString.length) {
        nodeSearch = nodeSearch + "+" + nodeString[i];
    }
    else {
        nodeSearch += nodeString[i];
    }
}

// ----- NODE ARGUMENTS ----- //
var command = process.argv[2];
switch (command) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
        console.log("THAT ISN'T A COMMAND");
        return;
}

// ----- CONCERT-THIS FUNCTION ----- //
function concertThis() {
    var request = require("request");
    var moment = require('moment');
    var queryUrl = "https://rest.bandsintown.com/artists/" + nodeSearch + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
                console.log("\nVENUE NAME: " + (data[i].venue.name));
                console.log("VENUE LOCATION: " + (data[i].venue.city) + ", " + (data[i].venue.region));
                console.log("DATE OF THE EVENT: " + moment(data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY").toString());
                console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
            }
        }
    });
}

// ----- SPOTIFY-THIS-SONG FUNCTION ----- //
function spotifyThisSong() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: "bbea0f2832794388876f31175c613cb6",
        secret: "4d2823cb2c534534985a26e71d8abd41"
    });
    if (nodeSearch === "") {
        nodeSearch = "The Sign";
    }
    spotify.search({ type: 'track', query: nodeSearch }, function (err, data) {
        if (err) {
            return console.log("ERROR OCCURRED: " + err);
        }
        else {
            var dataString = JSON.stringify(data);
            var dataInfo = JSON.parse(dataString);
            for (var i = 0; i < dataInfo.tracks.items.length; i++) {
                for (var j = 0; j < dataInfo.tracks.items[i].artists.length; j++) {
                    console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
                    console.log("\nARTIST(S): " + dataInfo.tracks.items[i].artists[j].name);
                    console.log("SONG NAME: " + dataInfo.tracks.items[i].name);
                    console.log("PREVIEW: " + dataInfo.tracks.items[i].preview_url);
                    console.log("ALBUM: " + dataInfo.tracks.items[i].album.name);
                    console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
                }
            }
        }
    });
}

// ----- MOVIE-THIS FUNCTION ----- //
function movieThis() {
    var request = require("request");
    var queryUrl = "http://www.omdbapi.com/?t=" + nodeSearch + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            if (nodeSearch === "") {
                console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
                console.log("\nIF YOU HAVEN'T SEEN MR. NOBODY, THEN YOU SHOULD!:");
                console.log("http://www.imdb.com/title/tt0485947/")
                console.log("IT'S ON NETFLIX!");
                console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
            }
            else {
                var data = JSON.parse(body);
                console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
                console.log("\nMOVIE: " + data.Title);
                console.log("YEAR RELEASED: " + data.Year);
                console.log("IMDB RATING: " + data.imdbRating);
                console.log("ROTTEN TOMATOES RATING: " + data.Ratings[1].Value);
                console.log("COUNTRY PRODUCED IN: " + data.Country);
                console.log("LANGUAGE: " + data.Language);
                console.log("PLOT: " + data.Plot);
                console.log("ACTORS: " + data.Actors);
                console.log("\n=*=*=*=*=*=*=*=*=*=*=*=*=*=*=");
            }
        }
    });
}

// ----- DO-WHAT-IT-SAYS FUNCTION ----- //
function doWhatItSays() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(data);
            var dataArray = data.split(",");
            console.log(dataArray[1].substr(1, dataArray[1].length - 2));
            var newArray = dataArray[1].substr(1, dataArray[1].length - 2).split(" ");
            for (var i = 3; i < newArray.length; i++) {
                if (i > 3 && i < newArray.length) {
                    nodeSearch = nodeSearch + "+" + newArray[i];
                }
                else {
                    nodeSearch += newArray[i];
                }
            }
        }
        // ----- NODE ARGUMENTS FOR DO-WHAT-IT-SAYS FUNCTION ----- //
        switch (dataArray[0]) {
            case 'concert-this':
                concertThis();
                break;
            case 'spotify-this-song':
                concertThis();
                break;
            case 'movie-this':
                concertThis();
                break;
            default:
                console.log("THAT ISN'T A COMMAND");
                return;
        }
    });
}
