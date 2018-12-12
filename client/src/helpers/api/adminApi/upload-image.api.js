export function uploadProductImage(file, id, callback) {
    var token = localStorage.getItem("token");
    const data = new FormData();
    data.append('file', file);
    data.append('productID', id);
  
    fetch("http://127.0.0.1:3000/admin-controller/update-product/image", {
        method: "POST",
        body: data,
        headers : { "token": token }
    }).then(response => {
        if (response.status === 200 && response.statusText === 'success') {
            callback(true);
        }
        else {
            callback(false);
        }
    }) 
};
