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
  for (var i in localAccount){
      if (localAccount[i].user == user) {
          return i;
      }
  }
  return -1;
}

// Function checkLogIn (already):
function checkLogInAlready() {
  var currentAccount = localStorage.getItem("currentAccount");
  var localAccount = JSON.parse(localStorage.getItem("accountArray"));
  if (currentAccount != null && findUserPosition(localAccount, currentAccount) != -1) {
      alert("You already login");
      window.location = "order.html";
  }
}

//Function checkLogIn (haven't):
function checkLogIn() {
  var currentAccount = localStorage.getItem("currentAccount");
  var localAccount = JSON.parse(localStorage.getItem("accountArray"));
  if (currentAccount == null || findUserPosition(localAccount, currentAccount) == -1) {
      alert("You haven't login");
      window.location = "login.html";
  }
  else {
      document.getElementById("user-name").innerHTML = currentAccount + "     ";
  }
}