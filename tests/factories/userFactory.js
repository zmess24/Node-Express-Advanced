const 
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = () => {
    return new User({}).save();
};