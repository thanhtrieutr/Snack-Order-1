var localAccount = JSON.parse(localStorage.getItem("accountArray"));
var currentAccount = localStorage.getItem("currentAccount");
var token = localStorage.getItem("token");
var currentUserInfo = {};

loadUserData();
goToShowMode(false);

var currentUsername = document.createTextNode(localStorage.getItem("currentAccount"));
document.getElementById("user-field").appendChild(currentUsername);

function getUserInfo(callback) {
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/get-user-info");
    var obj = {};
    obj.token = token;
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
            if (callback) callback(result);
        }
        if (this.readyState == 4 && this.status != 200)
            console.log("Load user info fail");
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

var listInfo = [ {
    id: "user-fullname",
    propertyName: "fullName",
    check: checkValidFullName
    }, {
    id: "user-phonenumber",
    propertyName: "phoneNumber",
    check: checkValidPhone
    }, { 
    id: "user-birthday",
    propertyName: "birthday",
    check: checkValidBirthday
    }, {
    id: "user-address",
    propertyName: "address",
    check: checkValidAddress
    } ];

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
            if (result == 'Fail!') {
                alert("Update fail");
            }
        }
        if (this.readyState == 4 && this.status != 200)
            alert("Update fail");
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

//Add click button by press enter button
function checkKeyPress(key) {
    if (key.keyCode == 13) {
        goToShowMode(true);
    }
  }
  
  addEventListener("keypress", checkKeyPress);

//check user input
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
    else return /\b(?:(?:0[1-9]|1\d|2[0-8]|[1-9])\/(?:0?2)\/(?:\d+)|(?:0[1-9]|1\d|2\d|[1-9])\/(?:0?2)\/(?:(?:\d*?(?:(?:0[48]|[13579][26]|[2468][048])|(?:(?:[02468][048]|[13579][26])00))|[48]00|[48])(?=\D|\b))|(?:0[1-9]|1\d|2\d|30|[1-9])\/(?:0?[469]|11)\/(?:\d+)|(?:0[1-9]|1\d|2\d|3[01]|[1-9])\/(?:0?[13578]|1[02])\/(?:\d+))\b/.test(birthday);
}
function checkValidAddress(address) {
    if (address == "" || address == null) {
        return true;
    } 
    else return /^\s*\S+(?:\s+\S+){1}/.test(address);
}