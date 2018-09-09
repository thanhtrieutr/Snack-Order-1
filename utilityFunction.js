// Function for getElementById:
function getById(field) {
    return document.getElementById(field);
};

//Function createNewAccount:
function createNewAccount(user, password) {
  var newAccount = {};
  newAccount.user = user;
  newAccount.password = password;
  newAccount.cartArray = [];
  return newAccount;
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
    http.open('POST', "http://127.0.0.1:3000/checkToken", true);
    http.send(JSON.stringify(token));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
            callback(result);
        }
    }
}
// Function checkLogIn (already):
function checkLogInAlready() {
  var token = localStorage.getItem("token");
  checkToken(token, result => {
    if (result) {
        alert("You already login");
        window.location = "order.html";
    }
  });
}

//Function checkLogIn (haven't):
function checkLogIn() {
  var currentAccount = localStorage.getItem("currentAccount");
  var token = localStorage.getItem("token");
  checkToken(token, result => {
    if (result == false) {
        alert("You haven't login");
        window.location = "login.html";
    }
    else {
        if (document.getElementById("user-name")) {
            document.getElementById("user-name").innerHTML = currentAccount + "     ";
        }
        if (document.getElementById("user-field")) {
            document.getElementById("user-field").innerHTML = currentAccount;
        }
    }
  });
}