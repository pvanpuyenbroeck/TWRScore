 var firebase = require('firebase');
 
 firebase.initializeApp({
     serviceAccount: '/Users/pieter/Documents/TWRNode/public/serviceAccount.json',
     databaseURL: "https://mvcscore.firebaseio.com"
 });


// load all the things we need
var FirebaseStrategy = require('passport-firebase-auth').Strategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

        // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new FirebaseStrategy({
    firebaseProjectId: "mvcscore",
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    callbackURL: 'https://localhost:8080/auth/calback',
    client_id: "mvcscore",
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ FirebaseId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }));
};