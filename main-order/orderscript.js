checkLogIn();
addEventListener("load", rotateUsername("user-name"));
getById("log-out-button").addEventListener('click', logOut);
getById("log-out-button-hambuger").addEventListener('click', logOut);
//after load  full data
function afterLoad() {
    showCurrentSnack();
}
function removeTokenOnServe(token) {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:3000/remove-token", true);
    http.send(JSON.stringify(token));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.response;
            if (result == 'Fail!')
                console.log("Remove token on server is fail!");
        }
    }
}
function logOut() {
    localStorage.removeItem("currentAccount");
    var token = localStorage.getItem("token");
    removeTokenOnServe(token);
    localStorage.removeItem('token');
    window.location.href = "/login";
}

function rotateUsername(id) {
    var element = getById(id);
    var textNode = element.childNodes[0]; // assuming no other children
    let text = textNode.data;
    if (text.length <= 20) {
        return;
    }
    setInterval(() => {
        text = text.substring(1, text.length) + text[0];
        textNode.data = text;
    }, 200);
}


//choose snack

var localAccount = (JSON.parse( localStorage.getItem("accountArray")) || []);
var user = localStorage.getItem("currentAccount");

function getUserInLocalAccount(temporary) {
    for (var i in localAccount) {
        if (localAccount[i].user == temporary) { 
            return localAccount[i]; 
        }
    }
    return -1;
}

const itemPrice = [19,35,19,44,19,35,19,44,19,35,19,44,19,35,19,44];

function totalPrice(cartArray) {
    var sum = 0;
    if (cartArray == null) cartArray = [];
    for (var i in cartArray) {
        sum += cartArray[i].amount * itemPrice[cartArray[i].productID - 1];
    }
    return displayPrice(sum * 1000);
}

function addSnack(ID, amount) {
    var cartID = "cart-" + ID;
    //parent 
    var parentElement = getById("still-main-bill-form");

    //make 1 snack element
    var oneDiv, oneSpan, oneText, snackName, snackPrice, oneButton, oneSpanAmount;
    oneDiv = document.createElement("div");
    oneDiv.setAttribute("class", "order-thing");
    oneDiv.setAttribute("id", cartID);

    //name of snack
    oneSpan = document.createElement("span");
    oneSpan.setAttribute("class", "name-of-snack cl-xs-12 cl-sm-12 cl-md-12");
    snackName = getById("snack-name-" + ID).innerHTML;
    oneText = document.createTextNode(snackName);
    oneSpan.appendChild(oneText);
    oneDiv.appendChild(oneSpan);

    //price of snack
    oneSpan = document.createElement("span");
    oneSpan.setAttribute("id", "price-display-" + ID);
    oneSpan.setAttribute("class", "price-of-snack cl-xs-3 cl-sm-3 cl-md-4");
    snackPrice = displayPrice(itemPrice[ID - 1] * 1000);
    oneText = document.createTextNode(snackPrice);
    oneSpan.appendChild(oneText);
    oneDiv.appendChild(oneSpan);

    //amount of snack
    oneSpan = document.createElement("span");
    oneSpan.setAttribute("class", "number-of-snack offset-xs-4 offset-sm-5 cl-sm-4 offset-md-3");
    //- button
    oneButton = document.createElement("button");
    oneButton.setAttribute("class", "number-button");
    oneButton.setAttribute("id", "minus-button-" + ID);
    oneButton.setAttribute("onclick", "decreaseAmount("+ ID +")");
    oneText = document.createTextNode("-");
    if (amount == 1) {
        oneButton.disabled = true;
    }
    oneButton.appendChild(oneText);
    oneSpan.appendChild(oneButton);
    
    //amount
    oneSpanAmount = document.createElement("span");
    oneSpanAmount.setAttribute("id", "amount-" + ID);
    oneSpanAmount.setAttribute("class", "amount-display");
    oneText = document.createTextNode(" " + amount + " ");
    oneSpanAmount.appendChild(oneText);
    oneSpan.appendChild(oneSpanAmount);

    //+ button
    oneButton = document.createElement("button");
    oneButton.setAttribute("class", "number-button");   
    oneButton.setAttribute("id","add-button-" + ID);
    oneButton.setAttribute("onclick", "increaseAmount("+ ID +")");
    oneText = document.createTextNode("+");
    oneButton.appendChild(oneText);
    oneSpan.appendChild(oneButton);
    oneDiv.appendChild(oneSpan);

    //add to parent
    parentElement.appendChild(oneDiv);
}
function removeSnack(ID) {
    var cartID = "cart-" + ID;
    var element = getById(cartID);
    if (document.contains(element)) { 
        element.parentNode.removeChild(element); 
    }
}
function showCurrentSnack() {
    var currentUser = getUserInLocalAccount(user);
    if (currentUser.cartArray == null) { 
        currentUser.cartArray = []; 
    }
    //hidd all
    for (var i = 1; i <= 12; i++) {
        removeSnack(i);
    }
    //show in data
    for (var i in currentUser.cartArray) {
        addSnack( currentUser.cartArray[i].productID, currentUser.cartArray[i].amount);
        document.getElementById("checkbox-" + currentUser.cartArray[i].productID).checked = true;
        document.getElementById("price-display-" + currentUser.cartArray[i].productID ).innerHTML = displayPrice(currentUser.cartArray[i].amount * itemPrice[Number(currentUser.cartArray[i].productID)-1] * 1000);
    }
    document.getElementById("total-price-number").innerHTML = totalPrice(currentUser.cartArray);
}

function findProductPosition(currentUser, currentID) {
    for (var i in currentUser.cartArray) {
        if (currentUser.cartArray[i].productID == currentID) {
            return i;
        }
    }
    return -1;
}
function chooseSnack(currentID) {
    var checkBox = getById("checkbox-" + currentID);
    var currentUser = getUserInLocalAccount(user);
    if (checkBox.checked == true) {
        var product = findProductPosition(currentUser, currentID);
        if (product == -1) {
            var newProduct = {
                productID: currentID,
                amount: 1
            };
            currentUser.cartArray.push(newProduct);
            localStorage.setItem("accountArray", JSON.stringify(localAccount));
            addSnack(newProduct.productID, newProduct.amount);
        }
        document.getElementById("total-price-number").innerHTML = totalPrice(currentUser.cartArray);
    }
    else {
        var product = findProductPosition(currentUser, currentID);
        if (product != -1) {
            currentUser.cartArray.splice(product, 1);
            localStorage.setItem("accountArray", JSON.stringify(localAccount));
            removeSnack(currentID);
        }
        document.getElementById("total-price-number").innerHTML = totalPrice(currentUser.cartArray);
    }
}

function displayPrice(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
        x = x.replace(pattern, "$1,$2");
    }
    return x + "đ";
}

function increaseAmount(currentID) {
    var currentUser = getUserInLocalAccount(user);
    var product = findProductPosition(currentUser, Number(currentID));
    var currentProduct = currentUser.cartArray[product];
    if (currentProduct.amount < 99) {
        currentProduct.amount ++;
    }
    if (currentProduct.amount == 99) {
        document.getElementById("add-button-" + currentID).disabled = true;
    }
    else {
        document.getElementById("add-button-" + currentID).disabled = false;
    }
    document.getElementById("minus-button-" + currentID).disabled = false;
    
    //show data
    document.getElementById("price-display-" + currentID).innerHTML = displayPrice(currentProduct.amount * itemPrice[Number(currentID)-1] * 1000);
    document.getElementById("amount-" + currentID).innerHTML = " " + currentProduct.amount + " ";
    localStorage.setItem("accountArray", JSON.stringify(localAccount));
    document.getElementById("total-price-number").innerHTML = totalPrice(currentUser.cartArray);
}   

function decreaseAmount(currentID) {
    var currentUser = getUserInLocalAccount(user);
    var product = findProductPosition(currentUser, Number(currentID));
    var currentProduct = currentUser.cartArray[product];
    if (currentProduct.amount > 1) {
        currentProduct.amount --;
    }
    if (currentProduct.amount == 1) {
        document.getElementById("minus-button-" + currentID).disabled = true;
    }
    else { 
        document.getElementById("minus-button-" + currentID).disabled = false;
    }
    document.getElementById("add-button-" + currentID).disabled = false;
    
    //show data
    document.getElementById("price-display-" + currentID).innerHTML = displayPrice(currentProduct.amount * itemPrice[Number(currentID)-1] * 1000);
    document.getElementById("amount-" + currentID).innerHTML = " " + currentProduct.amount + " ";
    localStorage.setItem("accountArray", JSON.stringify(localAccount));
    document.getElementById("total-price-number").innerHTML = totalPrice(currentUser.cartArray);
}   

function popUp() {
    var bill = document.getElementById("bill-form");
    var button = document.getElementById("cart-button");
    var body = document.getElementsByTagName("BODY")[0];
    if (bill.style.display == "none") {
        bill.style.display = "inline-block";
        button.style.background = "orange";
        button.style.color = "white";
        body.style.position = "fixed";
    }
    else {
        bill.style.display = "none";
        button.style.background = "white";
        button.style.color = "orange";
        body.style.position = "sticky";
    }

}

function fixCartDisplay(billOrder) {
    var body = document.getElementsByTagName("BODY")[0];
    if (billOrder.matches) {
        document.getElementById("bill-form").style.display = "inline-block";
        body.style.position = "sticky";
    } else document.getElementById("bill-form").style.display = "none";
}
var billOrderDesktopDisplay = window.matchMedia("(min-width: 768px)");
var billOrderMobileDisplay = window.matchMedia("(min-width: 100px)");
fixCartDisplay(billOrderDesktopDisplay);
fixCartDisplay(billOrderMobileDisplay)
billOrderDesktopDisplay.addListener(fixCartDisplay);
billOrderMobileDisplay.addListener(fixCartDisplay);

addEventListener('load',function() {
    document.getElementById("hambuger-box").style.display = "none";
});
window.addEventListener('resize',fixHambuger);
document.getElementById("hambuger-button").addEventListener('click',showHambugerBox);

function fixHambuger() {
    width=window.innerWidth;
    var x = document.getElementById("hambuger-box");
    if (width >= 768) x.style.display = "none";
}

function showHambugerBox() {
    var x = document.getElementById("hambuger-box");
    if (x.style.display == "none") {
        x.style.display = "inline-block";
    }
    else x.style.display = "none";
}

function autoHide() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        document.getElementById("bill-form").style.display = "none";
    } 
}
autoHide();