var mongoose = require('mongoose');

var adminAccountSchema = mongoose.Schema({
    user: String,
    password : String,
    token : String
});

exports.module = adminAccountSchema;