import {_helper} from '../_helper';

export function loadProduct(page, perPage, callback) {
  var token = localStorage.getItem('token');
  _helper.fetchPOST(`/admin-controller/get-products?perPage=${perPage}&page=${page}`, {token}, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  });
}
