var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    user: String,
    password : String,
    fullName : String,
    phoneNumber : String,
    birthday : String,
    address : String,
    avatarAddress : String,
    token : String
});

var accountModel = mongoose.model('account', accountSchema, 'account');

module.exports = accountModel;