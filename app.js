const express = require('express');
const app = express();
const port = 3000;

const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./config/database.js');
const router = require('./routes/router.js');
const flash = require ('connect-flash');
const passport = require('passport');

// app middlewares
app.use(express.static('public'))
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// required for passport authentication
app.use(session({
    secret: "cats",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport); 

// view engine setup
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));




app.use('/', router);


app.listen(port, () => {
    console.log(`+ Server running on port ${port}!`)
})