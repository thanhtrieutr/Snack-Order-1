function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localUser = localStorage.getItem("UserArray");
    if (currentAccount==null || localUser.indexOf(currentAccount) == -1){
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
    // alert("remove succeed");
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
// test data
var demoObject = [{
    user: "test",
    password: "123"
}];
var tmp = [{
    productID: 1,
    amount: 1
}];
demoObject[0].cartArray = tmp;
localStorage.setItem("accountArray", JSON.stringify(demoObject));
//


var localAccount = (JSON.parse(localStorage.getItem("accountArray")) || []);
var user = /*document.getElementById("user_name").innerHTML*/ "test";

function getUserInLocalAccount( tmpUser){
    for (var i in localAccount){
        if (localAccount[i].user == tmpUser)
            return localAccount[i];
    }
    return -1;
}
function showCurrentSnack(){
    var currentUser = getUserInLocalAccount(user);
    if (currentUser.cartArray == null)
        currentUser.cartArray = [];
    //hidd all
    for (var i=1; i<=4; i++){
        var cartID = "cart-" + i;
        document.getElementById(cartID).style.display = "none";
    }
    //show in data
    for (var i in currentUser.cartArray){
        var cartID = "cart-" + currentUser.cartArray[i].productID;
        var displaySnack = document.getElementById(cartID);
        displaySnack.style.display = "block";
        displaySnack.style.order = i;
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
    if (checkBox.checked == true){
        var product = findProductPosition(currentUser, currentID);
        if (product == -1){
            var newProduct = {
                productID : currentID,
                amount : 1
            };
            currentUser.cartArray.push(newProduct);
            localStorage.setItem("accountArray", JSON.stringify(localAccount));
            showCurrentSnack();
        }
    }
    else{
        var product = findProductPosition(currentUser, currentID);
        if (product != -1){
            currentUser.cartArray.splice(product, 1);
            localStorage.setItem("accountArray", JSON.stringify(localAccount));
            showCurrentSnack();
        }
    }
}