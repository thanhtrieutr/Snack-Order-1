//// client
var snackListId=0;
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
    snackListId++;
    newSnack.setAttribute("class", "one-snack cl-md-3 cl-sm-4 cl-xs-6");
    newSnack.setAttribute("for", `checkbox-${snackListId}`);
    newSnack.innerHTML = 
    `<img class="snack-img" src=${snack.img} alt="Snack Bento ">
    <div class="main-snack-name" id="snack-name-${snackListId}">
        ${snack.name}
    </div>
    <div class="main-snack-price" id="snack-price-${snackListId}">
        ${snack.price}
    </div>
    <input class="checkbox-button" data-id="${snack._id}" data-position=${snackListId} type="checkbox" id="checkbox-${snackListId}" onclick="chooseSnack(${snackListId})">`;
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
            snackListId=0;
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
    http.open("POST", "http://127.0.0.1:3000/submit-cart", true);
    var currentUser = getUserInLocalAccount(user);
    var obj = {};
    obj.cartArray = currentUser.cartArray;
    addInTrueId(obj.cartArray);
    obj.token = localStorage.getItem("token");
    debugger;
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function () {
        if (this.readyState == 4){
            var result = JSON.parse(this.response);
            debugger;
            if (this.status != 200) {
                alertError(this.response);
            }
            else {
                var answer = "Bill: \n";
                for (var i in result.products) {
                    answer += result.products[i].name + ":" + currentUser.cartArray[i].amount + "\n";
                }
                answer += "Total price: " +  result.estimateTotalPrice + "đ" ;
                alert(answer);
            }
        }
    }
    deleteTrueId(obj.cartArray);
}

function addInTrueId(cartArray) {
    cartArray.forEach(product => {
        var checkBox = getById("checkbox-" + product.productID);
        debugger;
        product.productTrueID=checkBox.getAttribute("data-id");
    });
    debugger;
}

function deleteTrueId(cartArray) {
    cartArray.forEach(product => {
        var checkBox = getById("checkbox-" + product.productID);
        product.productTrueID=checkBox.getAttribute("data-position");
    });
    debugger;
}
