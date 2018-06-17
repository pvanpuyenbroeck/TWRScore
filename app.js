var express = require("express");
var app = express();
var admin = require('firebase-admin');
var middleware = require('./middleware/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//configuration
mongoose.connect(configDB.url);

require('./config/passport')(passport);

//set up express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');// set up ejs for templating

//required for passport
app.use(session({secret:'ilovepoekiepoekidoe'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//require routes
require('./app/routes.js')(app, passport);//routes laden en volledig geconfigureerde passport


//var auth = firebase.auth();

var port = 8080;

app.listen(port, function(){
    console.log("Server has started");
});