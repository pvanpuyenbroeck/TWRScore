
// load all the things we need
var FirebaseStrategy = require('passport-firebase-auth').Strategy;

// load up the user model
var User            = require('../app/models/user');


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