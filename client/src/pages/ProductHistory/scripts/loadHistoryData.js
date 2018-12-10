var token = localStorage.getItem("token");

export function getProductHistory (callback) {
  var object = {token: token};
  console.log(object);
  fetch ("http://127.0.0.1:3000/admin-controller/get-order-history", {
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