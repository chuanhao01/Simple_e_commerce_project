// Importing other controllers
const apiController = require('./apiController');
const homeController = require('./homeController');
const accountController = require('./accountController');
const usersController = require('./usersController');

const controllers = {
    init(app){
        apiController.init(app);
        homeController.init(app);
        accountController.init(app);
        usersController.init(app);
    },
};

module.exports = controllers;