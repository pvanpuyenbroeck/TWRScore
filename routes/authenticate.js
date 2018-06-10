var firebase = require('firebase');
var express = require("express");
var middleware = require('../middleware/index.js');
var bodyParser = require('body-parser');
var router  = express.Router();

  var config = {
    apiKey: "AIzaSyBozHGXL0oCEHsaK3KxN1nEHsYoydZvL8g",
    authDomain: "mvcscore.firebaseapp.com",
    databaseURL: "https://mvcscore.firebaseio.com",
    projectId: "mvcscore",
    storageBucket: "mvcscore.appspot.com",
    messagingSenderId: "87462869957"
  };
  firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  router.user = user;
  console.log(router.user);
  if(router.user){  
  }
  });

router.get("/",loggedIn, function(req,res){
        res.render("home");
})

router.get("/home",function(req,res){
    res.render("home");
})

router.get("/login", function(req,res){
    res.render("login");
})
router.get("/register", function(req,res){
    res.render('register');
})

router.post("/Register", function(req,res){
    var email = req.body.email;
    var pasword = req.body.pasword;
    firebase.auth().createUserWithEmailAndPassword(email,pasword).catch(function(error){
        var errorcode = error.code;
        var errorMessage = error.message;
    });
    res.render('home');
});
router.post("/Login", function(req,res){
    var email = req.body.email;
    var pasword = req.body.pasword;
    firebase.auth().signInWithEmailAndPassword(email,pasword).catch(function(error){
        var errorcode = error.code;
        var errorMessage = error.message;
    });
    res.render("home");
});

function loggedIn(req,res, next){
    // var user = firebase.auth().currentUser;
    if(router.user){
        return next();
    }
    res.render("login");
}

module.exports = router;