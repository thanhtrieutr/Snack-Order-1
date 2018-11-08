var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
    user: String,
    password : String,
    fullName : String,
    phoneNumber : String,
    birthday : String,
    address : String,
    avatarAddress : String,
    token : String
});

exports.module = accountSchema;