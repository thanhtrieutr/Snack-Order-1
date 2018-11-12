var assert = require('assert');
var checkProduct = require('./checkProduct');

describe('Check if name of a product is valid or not', function() {
    it('should return true if product name is an empty string', function() {
        var productChecker = checkProduct.checkValidProduct('');
        assert.deepStrictEqual(productChecker, true);
    });
    it('should return true if product name is null', function() {
        var productChecker = checkProduct.checkValidProduct();
        assert.deepStrictEqual(productChecker, true);
    });
    it('should return true if product name is an  > 40 characters string', function() {
        var productChecker = checkProduct.checkValidProduct('121234567890-1234567890---34567890123456789012345678901');
        assert.deepStrictEqual(productChecker, true);
    });
    it('should return true if product name has a special character', function() {
        var productChecker = checkProduct.checkValidProduct('@');
        assert.deepStrictEqual(productChecker, true);
    });
});

describe('Check if price of a product is valid or not', function() {
    it('should return true if price is a null', function() {
        var productChecker = checkProduct.checkPrice();
        assert.deepStrictEqual(productChecker, true);
    });
    it('should return true if price is a string', function() {
        var productChecker = checkProduct.checkPrice('1234567');
        assert.deepStrictEqual(productChecker, true);    
    });
})