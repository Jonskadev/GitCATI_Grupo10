
var config = require('.././models/config.js');

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

connection = mysql.createConnection(config);

// expose this function to our app using module.exports
module.exports = function(passport) {



    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("1");
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        console.log("2");
        connection.query('SELECT * FROM Usuario WHERE username = ' + connection.escape(user),function(err,rows){
            done(null, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            console.log("34");
            connection.connect(function(error) {
                if (error) {
                    console.error('Error connecting: ' + error.stack);
                    return;
                }
            });
            connection.query('SELECT * FROM Usuario WHERE username = ' + connection.escape(username),function(err,rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                req.session.user=rows[0]
                // all is well, return successful user
                return done(null,req.session.user);


            });



        }));

};
