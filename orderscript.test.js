const passText = 'color: #61B97F';
const failText = 'color: #E42A1B';
//------------------------------------------------------------------------------------------------------------------------
function findUserPos(localAccount, user){
    for (var i in localAccount){
        if (localAccount[i].user == user)
            return i;
    }
    return -1;
}

// test function findUserPos ----------------------------------------------------------------------------------------------
function testfindUserPos(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

var testVariable = JSON.parse(getItemfromLocal("accountArray"));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos([],getItemfromLocal("currentAccount")));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(null,getItemfromLocal("currentAccount")));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(undefined,getItemfromLocal("currentAccount")));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos([],""));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(null,null));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(undefined,undefined));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(testVariable,""));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(testVariable,null));
testfindUserPos("Testing findUserPos function: return correctly", -1, findUserPos(testVariable,undefined));
//------------------------------------------------------------------------------------------------------------------------

function getItemfromLocal(item) {
    return localStorage.getItem(item);
}

// test function getItemfromLocal ----------------------------------------------------------------------------------------------
function testgetItemfromLocal(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

testgetItemfromLocal("Testing getItemfromLocal function: return correctly", null, getItemfromLocal(""));
testgetItemfromLocal("Testing getItemfromLocal function: return correctly", null, getItemfromLocal(null));
testgetItemfromLocal("Testing getItemfromLocal function: return correctly", null, getItemfromLocal(undefined));
//------------------------------------------------------------------------------------------------------------------------

function checklogin() {
    var currentAccount = getItemfromLocal("currentAccount");
    var localAccount = JSON.parse(getItemfromLocal("accountArray"));
    if (currentAccount == null || findUserPos(localAccount, currentAccount) == -1){
        alert("You haven't login");
        window.location = "login.html";
    }
    else {
        document.getElementById("user_name").innerHTML = currentAccount+"     ";
        // alert("Current user: " + currentAccount);
    }
}

function logout(){
    localStorage.removeItem("currentAccount");
    window.location = "login.html";
}

function rotate_username(id){
    var element = document.getElementById(id);
    var textNode = element.childNodes[0]; // assuming no other children
    let text = textNode.data;
    if (text.length<=20) return;
    setInterval(() => {
        text = text.substring(1, text.length)+text[0];
        textNode.data = text;
    }, 200);
}

checklogin();
addEventListener("load",rotate_username("user_name"));
document.getElementById("logOutButton").addEventListener('click', logout);

//choose snack

var localAccount = (JSON.parse(getItemfromLocal("accountArray")) || []);
var user = getItemfromLocal("currentAccount");

function getUserInLocalAccount( tmpUser){
    for (var i in localAccount){
        if (localAccount[i].user == tmpUser)
            return localAccount[i];
    }
    return -1;
}

// test function getUserinLocalAccount -------------------------------------------------------------------------------------
function testgetUserInLocalAccount(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount([],getItemfromLocal("currentAccount")));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(null,getItemfromLocal("currentAccount")));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(undefined,getItemfromLocal("currentAccount")));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount([],""));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(null,null));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(undefined,undefined));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(testVariable,""));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(testVariable,null));
testgetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(testVariable,undefined));
//------------------------------------------------------------------------------------------------------------------------

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
    if (document.contains( element ))
        element.parentNode.removeChild(element);
}
function showCurrentSnack(){
    var currentUser = getUserInLocalAccount(user);
    if (currentUser.cartArray == null)
        currentUser.cartArray = [];
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
        if (currentUser.cartArray[i].productID == currentID)
            return i;
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

// Bug
// test function chooseSnack --------------------------------------------------------------------------------------------
function testchooseSnack(description, expectation, func) {
    var currentUser = getUserInLocalAccount(user);
    var afterAddorRemove = currentUser.cartArray.length;
    if (expectation + 1 == afterAddorRemove || expectation - 1 == afterAddorRemove) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

var testCurrentUser = getUserInLocalAccount(user);
var beforeAddorRemove = testCurrentUser.cartArray.length;
testchooseSnack("Testing chooseSnack function: return correctly", beforeAddorRemove, chooseSnack(1));
testchooseSnack("Testing chooseSnack function: return correctly", beforeAddorRemove, chooseSnack(2));
testchooseSnack("Testing chooseSnack function: return correctly", beforeAddorRemove, chooseSnack(3));
testchooseSnack("Testing chooseSnack function: return correctly", beforeAddorRemove, chooseSnack(4));
//------------------------------------------------------------------------------------------------------------------------