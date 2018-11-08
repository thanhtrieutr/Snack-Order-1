var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    pimg : String,
    price : Number
});

exports.module = productSchema;