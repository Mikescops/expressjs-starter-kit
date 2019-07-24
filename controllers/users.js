const mongoose = require('mongoose');

const indexUser = (_req, res, next) => {
	// Retrieve all users from Mongo
	mongoose.model('Users').find({}, (error, users) => {
		if (error) {
			return next(error);
		}
		//respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
		res.format({
			//HTML response will render the users/index.html
			html: () => {
				res.render('./users/list', {
					title: 'Users list',
					users: users
				});
			},
			//JSON response will show all users in JSON format
			json: () => {
				res.json(users);
			}
		});
	});
}

const storeUser = (req, res) => {
	// Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
	const { name, email } = req.body;

	//call the create function for our database
	mongoose.model('Users').create({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		email: email,
	}, (error, user) => {
		if (error) {
			return res.send("There was a problem adding the information to the database.");
		}
		//user has been created
		console.log('POST creating new user: ' + user);
		res.format({
			//HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
			html: function () {
				// If it worked, set the header so the address bar doesn't still say /adduser
				res.location("users");
				// And forward to success page
				res.redirect("/users");
			},
			//JSON response will show the newly created user
			json: function () {
				res.json(user);
			}
		});
	});
}

const getUser = (req, res, next) => {
	mongoose.model('Users').findById(req.params.id, (error, user) => {
		if (error) {
			return next(error);
		}
		console.log('GET Retrieving ID: ' + user._id);
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
	});
}

const editUser = (req, res) => {
	const id = req.params.id;
	// Search for the user within Mongo
	mongoose.model('Users').findById(id, (error, user) => {
		if (error) {
			return res.send('Error: There was a problem retrieving: ' + error);
		}
		//Return the user
		console.log('GET Retrieving ID: ' + user._id);
		res.format({
			//HTML response will render the 'edit.jade' template
			html: () => {
				res.render('users/edit', {
					title: 'Edit user #' + user._id,
					user: user
				});
			},
			//JSON response will return the JSON output
			json: () => {
				res.json(user);
			}
		});
	});
}

const updateUser = (req, res) => {
	// Get our REST and form values.
	const id = req.params.id;
	const { name, email } = req.body;

	//find the document by ID
	mongoose.model('Users').findByIdAndUpdate(id, {
		name: name,
		email: email,
	}, (error, user) => {
		if (error) {
			return res.send("There was a problem updating the information to the database: " + error);
		}
		//HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
		res.format({
			html: () => {
				res.redirect("/users/" + user._id);
			},
			//JSON responds showing the updated values
			json: () => {
				res.json(user);
			}
		});
	});
}

const deleteUser = (req, res, next) => {
	// Find user to delete by ID
	mongoose.model('Users').findById(req.params.id, (error, user) => {
		if (error) {
			return next(error);
		}
		//remove it from Mongo
		user.remove((error, user) => {
			if (error) {
				return next(error);
			}
			//Returning success messages saying it was deleted
			console.log('DELETE removing ID: ' + user._id);
			res.format({
				//HTML returns us back to the main page, or you can create a success page
				html: () => {
					res.redirect("/users");
				},
				//JSON returns the item with the message that is has been deleted
				json: () => {
					res.json({
						message: 'deleted',
						item: user
					});
				}
			});
		});
	});
}

module.exports = { indexUser, getUser, editUser, updateUser, deleteUser, storeUser };
