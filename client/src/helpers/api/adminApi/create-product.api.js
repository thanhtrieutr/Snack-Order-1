import {_helper} from '../_helper'

export function checkProductName (productName, callback) {
  var object = {
    productName: productName,
    token: localStorage.getItem("token")
  }
  fetch ("http://127.0.0.1:3000/admin-controller/check-product-name", {
    method: "POST",
    body: JSON.stringify(object)
  }).then(response => {
    if (response.status === 200) {
      callback(response.statusText)
    } else {
      callback(false);
    }
  })
}

export function uploadNewProduct (productName, productPrice, productImage, callback) {
  
  const token ={token: localStorage.getItem("token")}
  // const data =  {
  //   productName: productName,
  //   productPrice: productPrice,
  //   productImage: productImage,
  //   // token: token
  // }
  const data = new FormData();
  data.append("productName", productName);
  data.append("productPrice", productPrice);
  data.append("productImage", productImage);
  data.append("token", localStorage.getItem("token"))

  fetch("http://127.0.0.1:3000/admin-controller/create-new-product", {
    method: "POST",
    headers: token,
    body: data
  }).then(response => {
    if (response.status === 200 && response.statusText === 'OK') {
      callback(true);
  } else {
      callback(false);
  }
  })
}

// export function  uploadNewProduct (productName, productPrice, productImage, callback) {
//   var token = localStorage.getItem('token');
//   _helper.fetchPOST('/admin-controller/create-new-product', {productName, productPrice, productImage, token}, (err, result) => {
//   if (err) 
//     callback(err);
//   else {
//     callback(result.statusText);
//   }
// });
// }
