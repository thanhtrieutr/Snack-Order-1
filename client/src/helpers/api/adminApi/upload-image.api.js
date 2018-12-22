import {_helper} from '../_helper'
import {API_ROOT} from '../../../api-config'

export function uploadProductImage(file, id, callback) {
    var token = localStorage.getItem("token");
    const data = new FormData();

    data.append('file', file);
    data.append('productID', id);
  
    fetch(`${API_ROOT}/admin-controller/update-product/image`, {
        method: "POST",
        body: data,
        headers : { "token": token }
    }).then(response => {
        if (response.status === 200 && response.statusText === 'OK') {
            callback(true);
        } else {
            callback(false);
        }
    }) 
};

export function getOneProduct(id, callback) {
    var token = localStorage.getItem('token');
    _helper.fetchPOST('/admin-controller/get-product', {id, token}, (err, result) => {
    if (err) 
      callback(err);
    else {
      callback(result);
    }
  });
}