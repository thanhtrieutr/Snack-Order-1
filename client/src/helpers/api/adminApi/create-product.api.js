import {_helper} from '../_helper';

export function checkProductName(productName, callback) {
  let product = {
    productName: productName
  }
  _helper.fetchPOST('/admin-controller/check-product-name', product, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  })
}