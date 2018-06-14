var express = require("express");
var admin = require('firebase-admin');
var middleware = require('./middleware/index.js');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
//require routes
var authRoute = require('./routes/authenticate.js');

//var auth = firebase.auth();

var port = 8080;

app.set('view engine', 'ejs');

app.use(authRoute);

app.listen(port, function(){
    console.log("Server has started");
});