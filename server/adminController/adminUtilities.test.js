var assert = require('assert');
var emailCheck = require("./adminUtilities");
var passwordCheck = require('./adminUtilities');

describe('Check if email is valid or not', function() {
    it('should return false if username is an empty string', function() {
        var emailChecker = emailCheck.emailCheck('');
        assert.deepStrictEqual(emailChecker, false);
    });
    it('should return false if username has less than 6 character', function() {
        var emailChecker = emailCheck.emailCheck('abc@gmail.com')
        assert.deepStrictEqual(emailChecker, false);
    });
    it('should return false if it has more than 100 character'), function() {
        var emailChecker = emailCheck.emailCheck('abc1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@gmail.com')
        assert.deepStrictEqual(emailChecker, false);
    }
    it('shouldt return false if it is not a string', function () {
        var emailChecker = emailCheck.emailCheck(12345678910);
        assert.deepStrictEqual(emailChecker, false);    
    });
    it('should return false if it has special character in front of @', function () {
        var emailChecker = emailCheck.emailCheck('#$@!@@@gmail.com');
        assert.deepStrictEqual(emailChecker, false);
    });
});

describe('Check if password is valid or not', function() {
    it('should return false if password is an empty string', function() {
        var passwordChecker = passwordCheck.passwordCheck('');
        assert.deepStrictEqual(passwordChecker, false);
    });
    it('should return false if password is an interger', function() {
        var passwordChecker = passwordCheck.passwordCheck(123);
        assert.deepStrictEqual(passwordChecker, false);
    });
});