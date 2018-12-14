
export function loadSnack(callback) {
    fetch("http://127.0.0.1:3000/user-controller/get-products",{
        method: "GET"
    }).then(response => {
        if (response.status === 200) {
            response.json().then(function(data) {
                callback(data);
            });
        }
        else callback(false);
    }); 
}

