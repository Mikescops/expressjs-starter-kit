const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

// we instantiate express
const app = express();

// we define a default port to 3000 or use the environment variable named PORT
const port = process.env.PORT || 3000;

// we use the morgan middleware to log the HTTP requests we receive
app.use(logger('dev'));

// we use body-parser middleware to parse the body of HTTP requests (req.body)
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

// we use cookie-parser middleware to be able to read and parse Cookies header (req.cookies)
app.use(cookieParser());

// Load templating and statics
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nunjucks templating
nunjucks.configure('views', {
    autoescape: true, // will ensure template variable are safe from malicious injections
    express: app
});
app.set('view engine', 'html');

// load DB connection
require('./models/db');

// instruct express to use our routes middleware
app.use(require('./routes'));

// simple middleware to catch all non routed pages as 404 and forward to the error middleware
app.use((req, _res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    error.message = 'The page ' + req.hostname + req.originalUrl + ' could not be found on this website.';
    next(error);
});

/*** Error middlewares ***/


if (app.get('env') === 'development') {
    // Development error middleware
    // will print the stacktrace while in development mode
    app.use((error, _req, res, _next) => {
        if (!error) {
            error = new Error('Unknown error');
            error.status = 500;
        } else {
            error.status = 400;
        }
        res.status(error.status);
        res.render('error', {
            title: 'Error ' + error.status,
            message: error.message,
            stacktrace: error.stack
        });
    });
} else {
    // Production error middleware
    // no stacktraces leaked to user
    app.use((error, _req, res, _next) => {
        if (!error) {
            error = new Error('Unknown error');
            error.status = 500;
        } else {
            error.status = 400;
        }
        res.status(error.status);
        res.render('error', {
            title: 'Error ' + error.status,
            message: error.message,
            stacktrace: null
        });
    });
}

// we start our ExpressJS server
app.listen(port, () => {
    console.log('Listening at address http://localhost:' + port);
});
