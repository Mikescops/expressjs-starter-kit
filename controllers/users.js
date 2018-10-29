var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose');

router.route('/')
    //GET all users
    .get(function(req, res, next) {
        //retrieve all users from Monogo
        mongoose.model('Users').find({}, function (err, users) {
        	if (err) {
        		return console.error(err);
        	} else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the users/index.html
                      html: function(){
                      	res.render('./users/list', { users: users });
                      },
                    //JSON response will show all users in JSON format
                    json: function(){
                    	res.json(users);
                    }
                });
              }     
          });
    })
    //POST a new user
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var email = req.body.email;
        
        //call the create function for our database
        mongoose.model('Users').create({
        	_id : new mongoose.Types.ObjectId(),
            name : name,
            email : email,
        }, function (err, user) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //user has been created
                  console.log('POST creating new user: ' + user);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("users");
                        // And forward to success page
                        res.redirect("/users");
                    },
                    //JSON response will show the newly created user
                    json: function(){
                        res.json(user);
                    }
                });
              }
        })
	});

module.exports = router