import {_helper} from '../_helper';

export function loadProduct(callback) {
  var token = localStorage.getItem('token');
  _helper.fetchPOST('/admin-controller/get-products', {token}, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  });
}
