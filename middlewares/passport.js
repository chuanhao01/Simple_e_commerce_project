// Importing database
const dataAccess = require('../db/index');

let passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
    dataAccess.users.getUserbyUsername(username)
        .then(function(user){
            dataAccess.users.checkPassword(password, user.password)
                .then(
                    function(same){
                        if(same){
                            return done(null, {
                                user_id: user.user_id,
                                username: user.username,
                                role: user.role,
                            });
                        }
                        return done(null, false, { message: 'Incorrect Password.'});
                    }
                )
                .catch(
                    function(err){
                        return done(err);
                    }
                );
        })
        .catch(function(err){
            return done(null, false, {message: 'Incorrect username.'});
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});