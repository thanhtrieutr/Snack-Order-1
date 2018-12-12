import {_helper} from '../_helper';

export function updatePrice(id, price, callback) {
  let account = {
    id: id,
    productPrice: price
  }
  _helper.fetchPOST('/admin-controller/update-product/price', account, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  })
}

