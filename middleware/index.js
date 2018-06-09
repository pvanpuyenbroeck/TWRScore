var middlewareObj = {};
var app = require("../app.js");


// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName;
//     var email = user.email;
//     var emailVerified = user.emailVerified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData = user.providerData;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// });

middlewareObj.isLoggedIn = function(req,res, next){
    if(req.user){
        console.log(user + " is ingelogd");
        return next();
    }else{
        console.log("Er is niemand ingelogd");
        res.redirect("/login");
    }
    
}

middlewareObj.checkSomething = function(req,res,next){
    console.log("check iets hier");
    return next();
}

module.exports = middlewareObj;