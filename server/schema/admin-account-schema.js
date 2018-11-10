var mongoose = require('mongoose');

var adminAccountSchema = new mongoose.Schema({
    user: String,
    password : String,
    token : String
});

var adminModel = mongoose.model('adminAccount', adminAccountSchema, 'adminAccount');
module.exports = adminModel;