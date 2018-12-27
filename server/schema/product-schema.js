var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var productSchema = new mongoose.Schema({
    name: String,
    img : String,
    price : Number
});

productSchema.plugin(mongoosePaginate);

var productModel = mongoose.model('product', productSchema, 'product');

module.exports = productModel;