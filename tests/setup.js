// Tells Jest to wait 30 seconds before failing any test.
jest.setTimeout(30000);
// Require in user model to know that user collection exists
require('../models/User');

const 
    mongoose = require('mongoose'),
    keys = require('../config/keys');

// Tell mongoose to make use of NodeJS global promise object
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });