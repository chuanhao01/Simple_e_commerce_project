const dataAccess = require('../db/index');
const passport = require('passport');

const accountController = {
    init(app){
        // For account creation
        app.get('/account/create', function(req, res){
            res.render('account/createAccount', {
                'title': 'Create an account',
            });
        });
        app.post('/account/create', function(req, res){
            dataAccess.users.createUser(req.body.username, req.body.password).then(
                function(){
                    res.redirect('/account/login');
                }
            );
        });
        // For account login
        app.get('/account/login', function(req, res){
            res.render('account/loginAccount', {
                'title': 'Login Page'
            });
        });
        app.post('/account/login', passport.authenticate('local', {
            successRedirect: '/user/',
            failureRedirect: '/account/login',
        }));
        // Logout
        app.post('/account/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });
    }
};

module.exports = accountController;