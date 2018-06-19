//app/routes.js

module.exports = function(app,passport){

app.get('/', function(req,res){
        res.render("login.ejs");
})

app.get("/home",function(req,res){
    res.render("home.ejs", {user: req.username});
})

app.get("/login", function(req,res){
    res.render("login.ejs" ,{message: req.flash('loginMessage')});
})


//process the login form
app.post("/login",passport.authenticate('local-login'),{
    succesRedirect:'/home',
    failureRedirect : '/login',
    failureflash : true
});

//=========================
//Signup==================
//========================
//show the signup form
app.get("/register", function(req,res){
    res.render('register', {message: req.flash('signupMessage')});
})
//process the signup form
app.post('/register', passport.authenticate('local-signup',{
    succesRedirect : '/home',
    failureRedirect : '/register',
    failureflash : true
}), console.log("er is iets gelogd"));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home', {
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
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}