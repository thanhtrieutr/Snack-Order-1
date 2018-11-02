// Function for getElementById:
function getById(field) {
    return document.getElementById(field);
};

//Function createNewAccount:
function createNewAccount(user, password) {
    var newAccount = {};
    newAccount.user = user;
    newAccount.password = password;
    return newAccount;
}

//Function changePassword:
function changePasswordUser(oldPassword, newPassword, token) {
    var changePassword = {};
    changePassword.oldPassword = oldPassword;
    changePassword.newPassword = newPassword;
    changePassword.token = token;
    return changePassword;
}

//Function findUserPosition:
function findUserPosition(localAccount, user) {
    for (var i in localAccount) {
        if (localAccount[i].user == user) {
            return i;
        }
    }
    return -1;
}

function checkToken(token, callback) {
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/user-controller/check-token", true);
    var obj = {token: token};
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
            callback(result);
        }
        if (this.readyState == 4 && this.status != 200) {
            callback(false);
        }
    }
}
// Function checkLogIn (already):
function checkLogInAlready() {
    var token = localStorage.getItem("token");
    checkToken(token, result => {
        if (result) {
            alert("You have already logged in");
            window.location.href = "/";
        }
    });
}

//Function checkLogIn (haven't):
function checkLogIn() {
    var currentAccount = localStorage.getItem("currentAccount");
    var token = localStorage.getItem("token");
    checkToken(token, result => {
        if (result == false) {
            alert("You haven't logged in");
            window.location.href = "/login";
        } else {
            if (document.getElementById("user-name")) {
                document.getElementById("user-name").innerHTML = currentAccount + "     ";
            }
            if (document.getElementById("user-field")) {
                document.getElementById("user-field").innerHTML = currentAccount;
            }
        }
    });
}

function alertError(error) {
    alert(error);
}

function displayPrice(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
        x = x.replace(pattern, "$1,$2");
    }
    return x + " đ";
}