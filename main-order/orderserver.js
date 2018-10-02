//// client

loadSnack();
getById("order-button").addEventListener('click', submitCart);

////function

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
    }
}
//when click order
function submitCart() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:3000/submitCart", true);
    var currentUser = getUserInLocalAccount(user);
    console.log(currentUser);
    http.send(JSON.stringify(currentUser));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var result = JSON.parse(this.response);
            if (result == 'Fail') {
                alert ("Something went wrong with your cart! Please try again!");
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