const bot = require('fancy-groupme-bot');
const async = require('async');
const request = require('request');
const _ = require('underscore');
const events = require('events');
const util = require('util');
const http = require('http');
const formidable = require('formidable');
// local configuration read from env.
const TOKEN = "pHRZcCOaax7eJNCNYWrT4OIvtFkzGl41pVOq3cHv"; // your groupme api token
const GROUP = "7264366"; // the room you want to join
const NAME = "node"; // the name of your bot
const URL = "http://frozen-waters-9985.herokuapp.com"; // the domain you're serving from, should be accessible by Groupme.
const CONFIG = {token:TOKEN, group:GROUP, name:NAME, url:URL};
var port = Number(process.env.PORT || 5000);
var mybot = bot(CONFIG);

mybot.on('botRegistered', function(b) {
  console.log("I am registered");
  b.message("WHAT UP BRO?");
});

mybot.on('botMessage', function(b, message) {
  console.log("I got a message, fyi: " + message.name + " said " + message.text);
  if (message.name != b.name && (message.text.search(/^!echo/) != -1)) {
    var minusecho = message.text.substring(5);
    b.message(message.name + " said " + minusecho);
  }
});

console.log("i am serving");
mybot.serve(port);
