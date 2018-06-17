var firebase = require('firebase');
var express = require("express");
var middleware = require('../middleware/index.js');
var bodyParser = require('body-parser');
var router  = express.Router();
var FirebaseStrategy = require('passport-firebase-auth').Strategy;

passport.use(new FirebaseStrategy({
    firebaseProjectId: "mvcscore",
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    callbackURL: 'https://www.example.net/auth/firebase/callback'
  },
  function(accessToken, refreshToken, decodedToken, cb) {
    User.findOrCreate(..., function (err, user) {
      return cb(err, user);
    });
  }
));

  var config = {
    apiKey: "AIzaSyBozHGXL0oCEHsaK3KxN1nEHsYoydZvL8g",
    authDomain: "mvcscore.firebaseapp.com",
    databaseURL: "https://mvcscore.firebaseio.com",
    projectId: "mvcscore",
    storageBucket: "mvcscore.appspot.com",
    messagingSenderId: "87462869957"
  };
  firebase.initializeApp(config);

var serviceAccount = require('../public/serviceAccount.json');
var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mvcscore.firebaseio.com'
});

admin.auth().onAuthStateChanged(function(user) {
  router.user = user;
  console.log(router.user);
  if(router.user == null){  
      notLoggedin;
  }
});
var GetLoginName = function(req, res,next){
    if(router.user){
        req.username = router.user.email;
        next();
    } 
    next();
}

router.get("/", function(req,res){
        res.render("home",{user: router.email});
        console.log(router.email);
})

router.get("/home",function(req,res){
    res.render("home", {user: req.username});
})

router.get("/login", function(req,res){
    res.render("login" ,{user: req.username});
})
router.get("/register", function(req,res){
    res.render('register', {user: req.username});
})

router.post("/Register", function(req,res){
    var email = req.body.email;
    var pasword = req.body.pasword;
    firebase.auth().createUserWithEmailAndPassword(email,pasword).catch(function(error){
        var errorcode = error.code;
        var errorMessage = error.message;
    });
    console.log(firebase.auth().currentUser);
    res.render('home', {user: router.username});
});
router.post("/Login", login,function(req,res){
    res.redirect("login");
});

module.exports = router;