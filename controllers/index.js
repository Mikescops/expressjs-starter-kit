const userModel = require('../models/users').userModel;

const dashboard = (_req, res, next) => {
    userModel
        .find({})
        .then((users) => {
            //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
            res.format({
                // HTML response will render the users/index.html
                html: () => {
                    res.render('index', { users: users });
                },
                // JSON response will show all users in JSON format
                json: () => {
                    res.json(users);
                }
            });
        })
        .catch((error) => {
            // transmit the error to the next middleware
            return next(error);
        });
};

module.exports = { dashboard };
