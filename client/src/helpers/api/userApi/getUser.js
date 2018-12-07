import {_helper} from '../_helper';

export function checkValidUser(email, callback) {
  let account = {
    user: email
  }
  _helper.fetchPOST('/user-controller/get-user', account, (err, result) => {
    if (err)
      callback(err);
    else
      callback(result);
  });
}

export function validateCode(email, code, callback) {
  let obj = {
    user: email,
    code: code
  }
  _helper.fetchPOST('/user-controller/validate-code', obj, (err, result) => {
    if (err)
      callback(err);
    else
      callback(result);
  });
}

export function updatePassword(oldPassword, newPassword, token, callback) {
  let obj = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    token: token
  }
  _helper.fetchPOST('/user-controller/update-password', obj, (err, result) => {
    if (err)
      callback(err);
    else
      callback(result);
  });
}