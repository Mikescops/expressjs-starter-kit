const mongoose = require('mongoose');

// In this file we setup the connection to the database

const dbHost = process.env.DATABASE_HOST || '127.0.0.1';

mongoose.connect(`mongodb://${dbHost}/starterkit`, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 2000 // if the server is unavailable after 2 seconds, timeout
}).then().catch((error) => {
    console.error(error);
    process.exit(1);
});
