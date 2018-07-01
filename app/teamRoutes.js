//show team page

var express = require('express');
var teamroute = express.Router();
var middleware = require("../middleware/index.js");
require("./routes.js");

teamroute.get('/team',function(req, res){
    res.render('addTeam');
})

module.exports = teamroute;

