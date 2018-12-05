import {_helper} from '../_helper';

export function createUser(email, password, callback) {
  let account = {
    user: email,
    password: password
  }
  _helper.fetchPost('/admin-controller/create-user', {account}, result => {
    callback(result.status);
  })
}

