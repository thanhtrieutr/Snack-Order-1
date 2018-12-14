import {_helper} from '../_helper';

export function loadUser(callback) {
  var token = localStorage.getItem('token');
  _helper.fetchPOST('/admin-controller/get-users', {token}, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  });
}
