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
const WunderNodeClient = require("wundernode");
const URL = require('url');

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

//Wundernode config
var wundernodekey = "a8324356cc86d2ea";
var wunderdebug = false;

//instance initilization for both wundernode and fancy-groupme-bot
var mybot = bot(CONFIG);
var wunder = new WunderNodeClient(wundernodekey, wunderdebug, 10, 'minute');

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
    } else if (message.name != b.name && (message.text.search(/^w/) != -1)) { //This is going to be a a simple weather info command. thing.
        var query = message.text.substring(5);
        wunder.conditions(query, function (err, obj) {
            if (err) {
                b.message("Error processing query string:" + queryData.query);
            }
            b.message(obj);
        });
    }
});
//startup
console.log("i am serving");
mybot.serve(port);
