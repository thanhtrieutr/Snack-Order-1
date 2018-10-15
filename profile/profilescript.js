var localAccount = JSON.parse(localStorage.getItem("accountArray"));
var currentAccount = localStorage.getItem("currentAccount");
var token = localStorage.getItem("token");
var currentUserInfo = {};

checkLogIn();
loadUserData();
goToShowMode(false);

function getUserInfo(callback) {
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/get-user-info", true);
    var obj = {};
    obj.token = token;
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
            if (callback) callback(result);
        }
    };
}
function loadUserData() {
    var avatar = document.getElementById("avatar");
    getUserInfo( function (result) {
        if (result.avatarAddress) {
            avatar.setAttribute("src", result.avatarAddress);    
        }    
        showNewUserInfo(result);       
    });
}

var listInfo = [
    {id: "user-fullname",
    propertyName: "fullName",
    default: "Full name shows here",
    check: checkValidFullName}, 
    {id: "user-phonenumber",
    propertyName: "phoneNumber",
    default: "Phone number shows here",
    check: checkValidPhone}, 
    {id: "user-birthday",
    propertyName: "birthday",
    default: "Birthday shows here",
    check: checkValidBirthday}, 
    {id: "user-address",
    propertyName: "address",
    default: "Address shows here",
    check: checkValidAddress} 
];

function goToChangeMode() {
    for (var i in listInfo) {
        document.getElementById(listInfo[i].id).disabled = false;
    }
    document.getElementById("change-button").style.display = "none";
    document.getElementById("save-button").style.display = "block";
}
function showNewUserInfo(result) {
    for (var i in listInfo) {
        var inputField = document.getElementById(listInfo[i].id);
        if (result[listInfo[i].propertyName])
            inputField.value = result[listInfo[i].propertyName];
        else {
            inputField.placeholder = listInfo[i].default;
            inputField.value = null;
        }
    }
}
function sendNewUserInfo(userInfo) {
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/update-user-info", true);
    var obj = {};
    obj.token = token;
    for (var i in listInfo) {
        obj[listInfo[i].propertyName] = userInfo[listInfo[i].propertyName];
    }
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.response;
            if (result == 'Fail!')
                alert("Update fail");
        }
    };
}
function goToShowMode(isSave) {
    for (var i in listInfo) {
        document.getElementById(listInfo[i].id).disabled = true;
    }
    document.getElementById("change-button").style.display = "block";
    document.getElementById("save-button").style.display = "none";
    //save user info
    if (isSave) {
        var result = {}, validInput = true;
        for (var i in listInfo) {
            let inputField = document.getElementById(listInfo[i].id).value;
            if (listInfo[i].check(inputField)) {
                result[listInfo[i].propertyName] = inputField;
            }
            else {
                validInput = false;
                alert(`One of many input data is not valid`);
                break;
            }
        }
        if (validInput) {
            showNewUserInfo(result);
            sendNewUserInfo(result);
        }
        else getUserInfo(function(result) {
            showNewUserInfo(result);
        });
    }
}

//check
function checkValidPhone(telephone) {
    if (telephone == "" || telephone == null) {
        return true;
    }
    else return /^[0-9\s- \+]{8,13}$/.test(telephone);
}
function checkValidFullName(fullName) {
    if (fullName == "" || fullName == null) {
        return true;
    }
    else return /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName);
}
function checkValidBirthday(birthday) {
    if (birthday == "" || birthday == null) {
        return true;
    }
    else return /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/.test(birthday);
}
function checkValidAddress(address) {
    if (address == "" || address == null) {
        return true;
    } 
    else return /^\s*\S+(?:\s+\S+){1}/.test(address);
}