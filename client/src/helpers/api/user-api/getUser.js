import {_helper} from '../_helper';

export function checkValidUser(email, callback) {
  let account = {
    user: email
  }
  _helper.fetchPost('/user-controller/get-user', {account}, (err, result) => {
    if (err) 
      callback(err);
    else
      callback(result);
  })
}

