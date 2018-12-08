var express = require('express'),
	mongoose = require('mongoose');

exports.dashboard = function(req, res, next) {
	mongoose.model('Users').find({}, function (err, users) {
		if (err) {
			return next(err);
		} 
		else {
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
}