var express = require("express");

var app = express();
var port = 8080;

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