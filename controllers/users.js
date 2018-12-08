var express = require('express'),
	mongoose = require('mongoose');

exports.indexUser = function(req, res, next) {
	// Retrieve all users from Mongo
	mongoose.model('Users').find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			//respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
			res.format({
				//HTML response will render the users/index.html
				html: function() {
					res.render('./users/list', {
						title: 'Users list',
						users: users
					});
				},
				//JSON response will show all users in JSON format
				json: function() {
					res.json(users);
				}
			});
		}
	});
}

exports.storeUser = function(req, res) {
	// Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
	var name = req.body.name;
	var email = req.body.email;

	//call the create function for our database
	mongoose.model('Users').create({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		email: email,
	}, function(err, user) {
		if (err) {
			res.send("There was a problem adding the information to the database.");
		} else {
			//user has been created
			console.log('POST creating new user: ' + user);
			res.format({
				//HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
				html: function() {
					// If it worked, set the header so the address bar doesn't still say /adduser
					res.location("users");
					// And forward to success page
					res.redirect("/users");
				},
				//JSON response will show the newly created user
				json: function() {
					res.json(user);
				}
			});
		}
	})
}

exports.getUser = function(req, res, next) {
	mongoose.model('Users').findById(req.params.id, function(err, user) {
		if (err) {
			next(err);
		} else {
			console.log('GET Retrieving ID: ' + user._id);
			res.format({
				html: function() {
					res.render('users/view', {
						title: 'View of ' + user.name,
						user: user
					});
				},
				json: function() {
					res.json(user);
				}
			});
		}
	});
}

exports.editUser = function(req, res) {
	// Search for the user within Mongo
	mongoose.model('Users').findById(req.params.id, function(err, user) {
		if (err) {
			console.log('GET Error: There was a problem retrieving: ' + err);
		} else {
			//Return the user
			console.log('GET Retrieving ID: ' + user._id);
			res.format({
				//HTML response will render the 'edit.jade' template
				html: function() {
					res.render('users/edit', {
						title: 'Edit user #' + user._id,
						user: user
					});
				},
				//JSON response will return the JSON output
				json: function() {
					res.json(user);
				}
			});
		}
	});
}

exports.updateUser = function(req, res) {
	// Get our REST and form values.
	var id = req.params.id;
	var name = req.body.name;
	var email = req.body.email;

	//find the document by ID
	mongoose.model('Users').findByIdAndUpdate(id, {
		name: name,
		email: email,
	}, function(err, user) {
		if (err) {
			res.send("There was a problem updating the information to the database: " + err);
		} else {
			//HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
			res.format({
				html: function() {
					res.redirect("/users/" + user._id);
				},
				//JSON responds showing the updated values
				json: function() {
					res.json(user);
				}
			});
		}
	})
}

exports.deleteUser = function(req, res, next) {
	// Find user to delete by ID
	mongoose.model('Users').findById(req.params.id, function(err, user) {
		if (err) {
			return next(err);
		} else {
			//remove it from Mongo
			user.remove(function(err, user) {
				if (err) {
					return next(err);
				} else {
					//Returning success messages saying it was deleted
					console.log('DELETE removing ID: ' + user._id);
					res.format({
						//HTML returns us back to the main page, or you can create a success page
						html: function() {
							res.redirect("/users");
						},
						//JSON returns the item with the message that is has been deleted
						json: function() {
							res.json({
								message: 'deleted',
								item: user
							});
						}
					});
				}
			});
		}
	});
}