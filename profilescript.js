var localAccount = JSON.parse(localStorage.getItem("accountArray"));
var currentAccount = localStorage.getItem("currentAccount");
var isChangeMode;
// function findUserPosition(localAccount, user) {
//     for (var i in localAccount) {
//         if (localAccount[i].user == user) {
//             return i;
//         }
//     }
//     return -1;
// }
// function checkLogIn() {
//     if (currentAccount == null || findUserPosition(localAccount, currentAccount) == -1) {
//         alert("You haven't login");
//         window.location = "login.html";
//     }
//     else {
//         document.getElementById("user-field").innerHTML = currentAccount;
//     }
// }
checkLogIn();

function checkValidTelephone(telephone) {
    if (telephone == "" || telephone == null) {
        return true;
    }
    if (telephone.length < 8 || telephone.length > 15) {
        return false;
    }
    var pattern = /[0-9]/g;
    var number = telephone.match(pattern);
    alert(number);
    if (number.length < 8 || number.length > 12) {
        return false;
    }
    return /^[0-9- ]+$/.test(telephone);
}
//normal mode
function goToNormalMode(isSave) {
    isChangeMode = false;
    var account = localAccount[ findUserPosition(localAccount, currentAccount)];
    if (account.telephone == null) {
        account.telephone = "";
    }
    if (account.address == null) {
        account.address = "";
    }
    //button
    document.getElementById("change-button").style.display = "inline";
    document.getElementById("save-button").style.display = "none";

    //hide input
    document.getElementById("telephone-input").style.display = "none";
    document.getElementById("address-input").style.display = "none";
    if (isSave) {
        var currentTelephone = document.getElementById("telephone-input").value;
        var currentAddress = document.getElementById("address-input").value;
        if (checkValidTelephone( currentTelephone)) {
            account.telephone = currentTelephone;
        }
        else alert("Not valid telephone");
        account.address = currentAddress;
        localStorage.setItem("accountArray", JSON.stringify(localAccount));
    }

    //show current data
    document.getElementById("telephone-field").style.display = "inline";
    document.getElementById("address-field").style.display = "inline";
    
    document.getElementById("telephone-field").innerHTML = account.telephone;
    document.getElementById("address-field").innerHTML = account.address;
}
//default
goToNormalMode(false);

//change mode
function goToChangeMode() {
    isChangeMode = true;
    var account = localAccount[ findUserPosition(localAccount, currentAccount)];
    if (account.telephone == null) {
        account.telephone = "";
    }
    if (account.address == null) {
        account.address = "";
    }
    //button
    document.getElementById("change-button").style.display = "none";
    document.getElementById("save-button").style.display = "inline";

    //show input
    document.getElementById("telephone-input").style.display = "inline-block";
    document.getElementById("address-input").style.display = "inline-block";

    document.getElementById("telephone-input").value = account.telephone;
    document.getElementById("address-input").value = account.address;

    //hide current data field
    document.getElementById("telephone-field").style.display = "none";
    document.getElementById("address-field").style.display = "none";
}

function checkKeyPress(key) {
    if (key.keyCode == 13 && isChangeMode) {
        goToNormalMode(true);
    }
}
addEventListener("keypress",checkKeyPress);