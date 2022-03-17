const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks');

// we use the morgan middleware to log the HTTP requests we receive
app.use(logger('dev'));

// we use body-parser middleware to parse the body of HTTP requests (req.body)
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

// we use cookie-parser moddleware to be able to read and parse Cookies header (req.cookies)
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
const db = require('./models/db');
// load user DB
const users = require('./models/users');

// routes middleware
app.use(require('./routes'));

// simple middleware to catch all non routed pages as 404 and forward to the error middleware
app.use((req, _res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    error.message = 'The page ' + req.hostname + req.originalUrl + ' could not be found on this website.';
    next(error);
});

/*** Error middlewares ***/

// Development error middleware
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((error, _req, res, _next) => {
        res.status(error.status || 500);
        res.render('error', {
            title: 'Error ' + error.status,
            message: error.message,
            error: error
        });
    });
}

// Production error middleware
// no stacktraces leaked to user
app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    res.render('error', {
        title: 'Error ' + error.status,
        message: error.message,
        error: {}
    });
});

app.listen(port, () => {
    console.log('Listening at address http://localhost:' + port);
});
