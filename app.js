var express = require("express");
var admin = require('firebase-admin');
var firebase = require('firebase');
var bodyParser = require('body-parser');

//var auth = firebase.auth();
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
var port = 8080;
var serviceAccount = require('./public/mvcscore-firebase-adminsdk-koyk8-a6adcdbe31.json');

firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mvcscore.firebaseio.com"
});

app.set('view engine', 'ejs');

app.get("/", function(req,res){
    res.render("home");
})
app.get("/login", function(req,res){
    res.render("Login");
})

app.post("/Login", function(req,res){
    var email = req.body.email;
    var pasword = req.body.pasword;
    firebase.auth().createUserWithEmailAndPassword(email,pasword, function(err){
        if(err){
            console.log("niet gelukt");
        }
    });
})

app.listen(port, function(){
    console.log("Server has started");
});