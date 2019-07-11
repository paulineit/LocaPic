const mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
   latitude: Number,
   longitude: Number
});

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    facebookid: String,
    historiquePosition: [locationSchema]
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
