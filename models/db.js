const mongoose = require('mongoose');

// In this file we setup the connection to the database

mongoose.connect('mongodb://127.0.0.1/starterkit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
