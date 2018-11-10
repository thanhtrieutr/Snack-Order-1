var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    pimg : String,
    price : Number
});

var productModel = mongoose.model('product', productSchema, 'product');

module.exports = productModel;