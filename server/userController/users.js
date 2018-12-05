var crud         = require('../utilities/databaseCRUD');
var accountModel = require("../schema/account-schema");

exports.getUser = function (request, response, next) {
  var collectClient = new Promise(function (resolve, reject) {
    var result = request.body;
    if (result instanceof Error) {
        reject(new Error("Wrong Data Input"));
    }
    if (typeof (result) != "object" || result == null) {
        reject(new Error("Wrong Data Input"));
    }
    resolve(result);
  });

  collectClient.then(result => {
    let findObject = {
      user: result.user
    }
    crud.readOneDocument(accountModel, findObject, account => {
      if (account === null) {
        response.json({
          success: false,
          message: 'not exist'
        });
      }
      else {
        response.json({
          success: true,
          message: "exist"
        });
      }
    })
  })
  .catch((error) => {
      next(error);
  });
}

exports.validateCode = function (request, response, next) {
  var readPost = new Promise(function(resolve, reject) {
    var result = request.body;
    if (result instanceof Error) {
      reject(new Error("Wrong Data Input"));
    }
    if (typeof (result) != "object" || result == null) {
        reject(new Error("Wrong Data Input"));
    }
    resolve(result);
  });
  readPost.then((result) => {
    var queryObj = {
      user: result.user
    }
    if (result.code === 'ABCDEF') {
      crud.readOneDocument(accountModel, queryObj, account => {
        response.json({
          success: true,
          token: account.token,
          password: account.password
        })
      });
    } else {
      response.json({
        success: false
      })
    }
  })
  .catch((error) => {
    next(error);
  });
}