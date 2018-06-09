var express = require("express");
var admin = require('firebase-admin');
var firebase = require('firebase');
var bodyParser = require('body-parser');

//var auth = firebase.auth();
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
var port = 8080;
  var config = {
    apiKey: "AIzaSyBozHGXL0oCEHsaK3KxN1nEHsYoydZvL8g",
    authDomain: "mvcscore.firebaseapp.com",
    databaseURL: "https://mvcscore.firebaseio.com",
    projectId: "mvcscore",
    storageBucket: "mvcscore.appspot.com",
    messagingSenderId: "87462869957"
  };
  firebase.initializeApp(config);

app.set('view engine', 'ejs');

app.get("/", function(req,res){
    res.render("home");
})
app.get("/login", function(req,res){
    res.render("Login");
})
app.get("/register", function(req,res){
    res.render('register');
})

app.post("/Register", function(req,res){
    var email = req.body.email;
    var pasword = req.body.pasword;
    firebase.auth().createUserWithEmailAndPassword(email,pasword).catch(function(error){
        var errorcode = error.code;
        var errorMessage = error.message;
    });
    res.render('home');
});
app.post("/Login", function(req,res){
    var email = req.body.email;
    var pasword = req.body.pasword;
    firebase.auth().signInWithEmailAndPassword(email,pasword).catch(function(error){
        var errorcode = error.code;
        var errorMessage = error.message;
    });
    res.render('home');
});

app.listen(port, function(){
    console.log("Server has started");
});