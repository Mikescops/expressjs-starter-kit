const mongoose = require('mongoose');
const userModel = require('../models/users').userModel;

const indexUser = (_req, res, next) => {
	// Retrieve all users from Mongo
	userModel.find({}).then((users) => {
		// respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
		res.format({
			// HTML response will render the users/index.html
			html: () => {
				res.render('./users/list', {
					title: 'Users list',
					users: users
				});
			},
			// JSON response will show all users in JSON format
			json: () => {
				res.json(users);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const storeUser = (req, res, next) => {
	// Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
	const { name, email } = req.body;

	// call the create function for our database
	userModel.create({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		email: email,
	}).then((user) => {
		// user has been created
		console.log('POST created new user: ' + user);
		res.format({
			// HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
			html: function () {
				// If it worked, set the header so the address bar doesn't still say /adduser
				res.location("users");
				// And forward to success page
				res.redirect("/users");
			},
			// JSON response will show the newly created user
			json: function () {
				res.json(user);
			}
		});
	}).catch((error) => {
		// transmit a custom error to the next middleware
		return next(new Error("There was a problem adding the information to the database: " + error));
	});
};

const getUser = (req, res, next) => {
	userModel.findById(req.params.id).then((user) => {
		console.log('GET Retrieved ID: ' + user._id);
		res.format({
			html: () => {
				res.render('users/view', {
					title: 'View of ' + user.name,
					user: user
				});
			},
			json: () => {
				res.json(user);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const editUser = (req, res, next) => {
	const id = req.params.id;
	// Search for the user within Mongo
	userModel.findById(id).then((user) => {
		// Return the user
		console.log('GET Retrieved ID: ' + user._id);
		res.format({
			// HTML response will render the 'edit.jade' template
			html: () => {
				res.render('users/edit', {
					title: 'Edit user #' + user._id,
					user: user
				});
			},
			// JSON response will return the JSON output
			json: () => {
				res.json(user);
			}
		});
	}).catch((error) => {
		// transmit a custom error to the next middleware
		return next(new Error('Error: There was a problem during editUser: ' + error));
	});
};

const updateUser = (req, res, next) => {
	// Get our request and form values.
	const id = req.params.id;
	const { name, email } = req.body;

	// find the document by ID
	userModel.findByIdAndUpdate(id, { name, email }).then((user) => {
		// HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
		res.format({
			html: () => {
				res.redirect("/users/" + user._id);
			},
			// JSON responds showing the updated values
			json: () => {
				res.json(user);
			}
		});
	}).catch((error) => {
		// transmit a custom error to the next middleware
		return next(new Error("There was a problem updating the information to the database: " + error));
	});
};

const deleteUser = (req, res, next) => {
	// Find user to delete by ID
	userModel.findById(req.params.id).then((user) => {
		if (!user) {
			return next(new Error('No user to delete with the specified Id.'));
		}
		// remove it from Mongo
		userModel.deleteOne(user).then((user) => {
			// Returning success messages saying it was deleted
			console.log('DELETE removed ID: ' + user._id);
			res.format({
				// HTML returns us back to the main page, or you can create a success page
				html: () => {
					res.redirect("/users");
				},
				// JSON returns the item with the message that is has been deleted
				json: () => {
					res.json({
						message: 'deleted',
						item: user
					});
				}
			});
		}).catch((error) => {
			// transmit the error to the next middleware
			return next(error);
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

// we export a list of all our controllers
module.exports = { indexUser, getUser, editUser, updateUser, deleteUser, storeUser };
