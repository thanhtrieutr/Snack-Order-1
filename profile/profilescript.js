var localAccount = JSON.parse(localStorage.getItem("accountArray"));
var currentAccount = localStorage.getItem("currentAccount");
var isChangeMode;
checkLogIn();

function alertUserinChangingProfile() {
    alert("This feature is in development");
}
function checkValidTelephone(telephone) {
    if (telephone == "" || telephone == null) {
        return true;
    }
    if (telephone.length < 8 || telephone.length > 15) {
        return false;
    }
    var pattern = /[0-9]/g;
    var number = telephone.match(pattern);
    if (number.length < 8 || number.length > 12) {
        return false;
    }
    return /^[0-9- ]+$/.test(telephone);
}
//normal mode
function goToNormalMode(isSave) {
    isChangeMode = false;
    //button
    document.getElementById("change-button").style.display = "inline";
    document.getElementById("save-button").style.display = "none";

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
}

function checkKeyPress(key) {
    if (key.keyCode == 13 ) {
        goToNormalMode(true);
    }
}
addEventListener("keypress",checkKeyPress);