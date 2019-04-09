var express = require('express');
var app = express();
var path = require("path");

app.use(express.static('public'));

  module.exports = function (app) {

  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });
};
console.log("html route found (◕‿◕✿)");
