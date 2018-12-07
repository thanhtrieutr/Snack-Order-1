import {_helper} from '../_helper';

export function createUser(email, password, callback) {
  let account = {
    user: email,
    password: password
  }
  _helper.fetchPOST('/admin-controller/create-user', account, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  })
}

