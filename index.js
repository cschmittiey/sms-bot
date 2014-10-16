//SMS-Bot
//written by Caleb Smith

//Requires
const bot = require('fancy-groupme-bot');
const async = require('async');
const request = require('request');
const _ = require('underscore');
const events = require('events');
const util = require('util');
const http = require('http');
const formidable = require('formidable');
const Forecast = require('forecast');
const URL = require('url');
var cities = require('cities');
//fancy-groupme-bot config vars
const TOKEN = "pHRZcCOaax7eJNCNYWrT4OIvtFkzGl41pVOq3cHv"; // your groupme api token
const GROUP = "7264366"; // the room you want to join
const NAME = "node"; // the name of your bot
const URL2 = "http://frozen-waters-9985.herokuapp.com"; // the domain you're serving from, should be accessible by Groupme.
const CONFIG = {
    token: TOKEN,
    group: GROUP,
    name: NAME,
    url: URL2
};

//some other useful stuff
var port = Number(process.env.PORT || 5000);

var mybot = bot(CONFIG);

var forecast = new Forecast({
  service: 'forecast.io',
  key: 'b07f3f4bd55e300af0bec21f71de5fb0',
  units: 'fahrenheit', // Only the first letter is parsed
  cache: true,      // Cache API requests?
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 5,
    seconds: 45
    }
});

//When the groupme bot registers, this is passed to the chat.
mybot.on('botRegistered', function (b) {
    console.log("I am registered");
    b.message("<bot registers>");
});

//the meaty part
mybot.on('botMessage', function (b, message) {
    console.log("I got a message, fyi: " + message.name + " said " + message.text);
    if (message.name != b.name && (message.text.search(/^!echo/) != -1)) { //.search provides a -1 if the regex returns nothing
        var minusecho = message.text.substring(5); //removing the !echo bit
        b.message(message.name + " said " + minusecho);
    } else if (message.name != b.name && (message.text.search(/^syn/) != -1)) {
        b.message("ACK!"); //sounds like a nasty cough you got there
    } else if (message.name != b.name && (message.text.search(/^!w/) != -1)) { //This is going to be a a simple weather info command. thing.
        var zipCode = message.text.substring(3);
        b.message("ZipCode=" + zipCode);
        var zipLat = Number(cities.zip_lookup(zipCode).latitude);
        b.message("Latitude=" + String(zipLat));
        var zipLong = Number(cities.zip_lookup(zipCode).longitude);
        b.message("Longitude=" + String(zipLong));
    }
});
//startup
console.log("i am serving");
mybot.serve(port);
