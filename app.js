var express = require("express");
var admin = require('firebase-admin');

//var auth = firebase.auth();
var app = express();
app.use(express.static(__dirname + "/public"));
var port = 8080;
var serviceAccount = require('./public/mvcscore-firebase-adminsdk-koyk8-a6adcdbe31.json');

admin.initializeApp({
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

app.listen(port, function(){
    console.log("Server has started");
});