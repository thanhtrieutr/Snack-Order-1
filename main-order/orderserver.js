//// client

loadSnack();
getById("order-button").addEventListener('click', submitCart);

////function

function removeTokenOnServe(token) {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:3000/remove-token", true);
    http.send(JSON.stringify(token));
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            var result = this.response;
            console.log(result);
        }
    }
}

function createNewSnack(snack) {
    var newSnack = document.createElement('label');
    newSnack.setAttribute("class", "one-snack cl-md-3 cl-sm-4 cl-xs-6");
    newSnack.setAttribute("for", `checkbox-${snack.id}`);
    newSnack.innerHTML = 
    `<img class="snack-img" src=${snack.img} alt="Snack Bento ">
    <div class="main-snack-name" id="snack-name-${snack.id}">
        ${snack.name}
    </div>
    <div class="main-snack-price" id="snack-price-${snack.id}">
        ${snack.price}
    </div>
    <input class="checkbox-button" type="checkbox" id="checkbox-${snack.id}" onclick="chooseSnack(${snack.id})">`;
    return newSnack;
}
// get snack from server
function loadSnack() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://127.0.0.1:3000/products", true);
    http.send();
    var snackList = document.getElementById("main-order");
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var  snacks = JSON.parse(this.response);
            snacks.forEach(snack => {
                var newSnack = createNewSnack(snack);
                snackList.appendChild(newSnack);
            });
            afterLoad();
        }
        if (this.readyState == 4 && this.status != 200)
            alertError(this.response);
    }
}
//when click order
function submitCart() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:3000/submitCart", true);
    var currentUser = getUserInLocalAccount(user);
    var obj = {};
    obj.cartArray = currentUser.cartArray;
    obj.token = localStorage.getItem("token");
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function () {
        if (this.readyState == 4){
            var result = JSON.parse(this.response);
            if (this.status != 200) {
                alertError(this.response);
            }
            else {
                var answer = "Bill: \n";
                for (var i in result.products) {
                    answer += result.products[i].name + ":" + currentUser.cartArray[i].amount + "\n";
                }
                answer += "Total price: " + result.totalPrice + "đ" ;
                alert(answer);
            }
        }
    }
}