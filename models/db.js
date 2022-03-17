const mongoose = require('mongoose');

// In this file we setup the connection to the database

mongoose.connect('mongodb://localhost/starterkit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
