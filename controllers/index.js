var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose');


router.use('/users', require('./users'))

router.get('/', function(req, res) {
	mongoose.model('Users').find({}, function (err, users) {
		if (err) {
			return console.error(err);
		} else {
		      //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
		      res.format({
		          //HTML response will render the users/index.html
		          html: function(){
		          	res.render('index', { users: users });
		          },
		        //JSON response will show all users in JSON format
		        json: function(){
		        	res.json(users);
		        }
		    });
		  }     
		});
})


module.exports = router