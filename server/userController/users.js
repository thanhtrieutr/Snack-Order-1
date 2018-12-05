var crud         = require('../utilities/databaseCRUD');
var accountModel = require("../schema/account-schema");

exports.getUser = function (request, response, next) {
  var collectClient = new Promise(function (resolve, reject) {
    var result = request.body.account;
    if (result instanceof Error) {
        reject(new Error("Wrong Data Input"));
    }
    if (typeof (result) != "object" || result == null) {
        reject(new Error("Wrong Data Input"));
    }
    resolve(result);
  });

  collectClient.then(result => {
    crud.readOneDocument(accountModel, result, account => {
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

