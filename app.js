const express = require('express');
const app = express();

// Setting up handleBars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        section(name, options){
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Adding passports
const passport = require('passport');
const session = require('express-session');
require('./middlewares/passport');

app.use(session({
    secret: process.env.CookiePassword,
    cookie: {
        httpOnly: true,
    },
    name: 'passport',
    resave: true,
    saveUninitialized: false,
}));

// Enabling body parser (Can send data through post req)
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true}));

// Passports again
app.use(passport.initialize());
app.use(passport.session());

// Setting up user middleware for views
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

// Getting controllers
const controllers = require('./controllers/index');

const port = 3000;

controllers.init(app);

// Initialising the port
app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
});
 