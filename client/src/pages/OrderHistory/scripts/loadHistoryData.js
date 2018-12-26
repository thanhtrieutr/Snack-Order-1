import {API_ROOT} from '../../../api-config'

var token = localStorage.getItem("token");

export function getProductHistory (callback) {
  var object = {token: token};
  fetch (`${API_ROOT}/admin-controller/get-order-history`, {
    method: "POST",
    body: JSON.stringify(object)
  }).then(response => {
    if (response.status === 200) {
      response.json().then(function(data) {
        callback(data);
      });
    } else {
        callback(false);
    }
  })
}