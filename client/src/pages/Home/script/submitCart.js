import {API_ROOT} from '../../../api-config'

export function submitCart(cartArray) {
    var obj = {};
    obj.cartArray = cartArray;
    obj.token = localStorage.getItem("token");
    console.log(obj);
    fetch(`${API_ROOT}/user-controller/submit-cart`, {
        method: "POST",
        body: JSON.stringify(obj)
    }).then(response => {
        if (response.status === 200) {
            response.json().then(function(result) {
                console.log(result);
                var answer = "Bill: \n";
                for (var i in result.products) {
                    answer += result.products[i].name + ": " + cartArray[i].amount + "\n";
                }
                answer += "Total price: " +  result.estimateTotalPrice + "đ" ;
                alert(answer); 
            });
        };
    });
}

