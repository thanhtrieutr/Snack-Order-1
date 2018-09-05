function findUserPosition(localAccount, user){
    for (var i in localAccount){
        if (localAccount[i].user == user){
            return i;}
    }
    return -1;
 }
 
function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (currentAccount == null ||  findUserPosition(localAccount, currentAccount) == -1){
        alert("You haven't login");
        window.location = "login.html";
    }
    else {
        document.getElementById("user-name").innerHTML = currentAccount + "     ";
    }
}

function logOut(){
    localStorage.removeItem("currentAccount");
    window.location = "login.html";
}

function rotateUsername(id){
    var element = document.getElementById(id);
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

checklogin();
addEventListener("load", rotateUsername("user-name"));
document.getElementById("log-out-button").addEventListener('click', logOut);

//choose snack


var localAccount = (JSON.parse(localStorage.getItem("accountArray")) || []);
var user = localStorage.getItem("currentAccount");

function getUserInLocalAccount( tmpUser){
    for (var i in localAccount){
        if (localAccount[i].user == tmpUser) { 
            return localAccount[i]; 
        }
    }
    return -1;
}
function addSnack(ID, amount){
    var cartID = "cart-" + ID;
    //parent 
    var parentElement = document.getElementById("still-main-bill-form");

    //make 1 snack element
    var oneDiv, oneSpan, oneText, snackName, snackPrice, oneButton;
    oneDiv = document.createElement("div");
    oneDiv.setAttribute("class", "order-thing");
    oneDiv.setAttribute("id", cartID);

    //name of snack
    oneSpan = document.createElement("span");
    oneSpan.setAttribute("class", "name-of-snack");
    snackName = document.getElementById("snack-name-" + ID).innerHTML;
    oneText = document.createTextNode( snackName );
    oneSpan.appendChild(oneText);
    oneDiv.appendChild(oneSpan);

    //price of snack
    oneSpan = document.createElement("span");
    oneSpan.setAttribute("class", "price-of-snack");
    snackPrice = document.getElementById("snack-price-" + ID).innerHTML;
    oneText = document.createTextNode( snackPrice );
    oneSpan.appendChild(oneText);
    oneDiv.appendChild(oneSpan);

    //amount of snack
    oneSpan = document.createElement("span");
    oneSpan.setAttribute("class", "number-of-snack");
    //- button
    oneButton = document.createElement("button");
    oneButton.setAttribute("class", "number-button");
    oneText = document.createTextNode("-");
    oneButton.appendChild(oneText);
    oneSpan.appendChild(oneButton);
    
    //amount
    oneText = document.createTextNode(" " + amount + " ");
    oneSpan.appendChild(oneText);

    //+ button
    oneButton = document.createElement("button");
    oneButton.setAttribute("class", "number-button");
    oneText = document.createTextNode("+");
    oneButton.appendChild(oneText);
    oneSpan.appendChild(oneButton);
    oneDiv.appendChild(oneSpan);

    //add to parent
    parentElement.appendChild(oneDiv);
}
function removeSnack(ID){
    var cartID = "cart-" + ID;
    var element = document.getElementById(cartID);
    if (document.contains( element )) { 
        element.parentNode.removeChild(element); 
    }
}
function showCurrentSnack(){
    var currentUser = getUserInLocalAccount(user);
    if (currentUser.cartArray == null) { 
        currentUser.cartArray = []; }
    //hidd all
    for (var i=1; i<=4; i++){
        removeSnack(i);
    }
    //show in data
    for (var i in currentUser.cartArray){
        addSnack( currentUser.cartArray[i].productID, currentUser.cartArray[i].amount);
        document.getElementById("checkbox-" + currentUser.cartArray[i].productID).checked = true;
    }
}
showCurrentSnack();

function findProductPosition(currentUser, currentID){
    for (var i in currentUser.cartArray){
        if (currentUser.cartArray[i].productID == currentID){
            return i;}
    }
    return -1;
}
function chooseSnack(currentID ){
    var checkBox = document.getElementById("checkbox-" + currentID);
    var currentUser = getUserInLocalAccount(user);
    console.log(currentUser);
    if (checkBox.checked == true){
        var product = findProductPosition(currentUser, currentID);
        if (product == -1){
            var newProduct = {
                productID : currentID,
                amount : 1
            };
            currentUser.cartArray.push(newProduct);
            localStorage.setItem("accountArray", JSON.stringify(localAccount));
            //showCurrentSnack();
            addSnack(newProduct.productID, newProduct.amount);
        }
    }
    else{
        var product = findProductPosition(currentUser, currentID);
        if (product != -1){
            currentUser.cartArray.splice(product, 1);
            localStorage.setItem("accountArray", JSON.stringify(localAccount));
            //showCurrentSnack();
            removeSnack(currentID);
        }
    }
}