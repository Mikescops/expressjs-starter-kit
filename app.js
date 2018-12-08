var express = require('express'),
	app = express(),
 	port = process.env.PORT || 3000,
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Load DB connection
var db = require('./models/db');

// Load user DB
var users = require('./models/users');

// Load templating and statics
app.use(express.static(path.join(__dirname, 'public')));

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');


// Call routes
app.use(require('./routes'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.message = 'The page ' + req.hostname + req.originalUrl + ' could not be found on this website.';
    next(err);
});


app.listen(port, function() {
  console.log('Listening on port ' + port)
})


/*** Error handlers ***/

// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: 'Error ' + err.status,
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Error ' + err.status,
        message: err.message,
        error: {}
    });
});


module.exports = app;