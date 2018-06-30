// app/routes.js

module.exports = function(app, passport) {
var Team = require("./models/team.js");
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.redirect('/home'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        console.log(req.flash('loginMessage') );
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

        // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/register', function(req, res) {

        // render the page and pass in any flash data if it exist
        res.render('register.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true// allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //======================================
    //Check stats
    //======================================
    app.get('/MyStats/:id', isLoggedIn, function(req,res){
        res.render('mystats', {user: req.user});
    });

    //======================================
    //Speler toevoegen
    //======================================
    app.get('/addPlayer', isLoggedIn, function(req,res){
        res.render('addPlayer',{user: req.user});
    })

    app.post('/newPlayer',isLoggedIn, function(req,res){
        var team = {
            teamName: "The White Russians",
            season: {
                period: '2018-2019',
                players:{
                    voornaam: req.body.voornaam,
                    familienaam: req.body.familienaam,
                }
            }
        }
        var nieuweSpeler ={voornaam: firstname, familienaam: lastname, nummer: number};

        Team.create(team,function(err, newlyCreated){
            if(err){
                console.log(err);
            }else{
                console.log(newlyCreated);
                res.redirect("/");
            }

        })
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/login');
}
