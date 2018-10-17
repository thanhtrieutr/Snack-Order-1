//Password check function
function passwordCheck(password) {
  return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

//Fix error alert in developer console
var currentUsername = document.createTextNode(localStorage.getItem("currentAccount"));
var token = localStorage.getItem("token");
document.getElementById("user-field").appendChild(currentUsername);
loadUserData();

//Load user avatar
function loadUserData() {
  var avatar = document.getElementById("avatar");
  getUserInfo( function (result) {
      if (result.avatarAddress) {
          avatar.setAttribute("src", result.avatarAddress);    
      }     
  });
}

//Function Get User Info
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
          console.log(this.response);
  };
}

function changeUserPassword(oldPassword, newPassword, token, callback) {
  //Using changePasswordUser function at others/utilities.js
  //This function stringtify oldPassword, newPassword and token
  var changePassword = changePasswordUser(oldPassword, newPassword, token);
  var http = new XMLHttpRequest();
  http.open('POST', "http://127.0.0.1:3000/updatePassword", true);
  http.send(JSON.stringify(changePassword));
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {       
        var result = this.response;
        if (callback) return callback(result);
      }
      if (this.readyState == 4 && this.status !=200)
        if (callback) return callback(false);
  }
}

function changePasswordValidation () {
  //Get user's input and token in local storage
  var oldPassword = getById("current-password").value;
  var newPassword = getById("new-password").value;
  var repeatNewPassword = getById("repeat-new-password").value;
  var token = localStorage.getItem("token");
  // Validate user's input
  if (newPassword.length < 8 || newPassword.length > 16) {
      alert("New password is too long or too short");
      return;
  } else if (!passwordCheck(newPassword)) {
      alert("Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}");
      return;
  } else if (repeatNewPassword != newPassword) {
      alert("New password and repeat password are not match");
      return;
  }
  //If all input condition are sastified, send stringtified data to server
  changeUserPassword(oldPassword, newPassword, token, result => {
      if (result == "Update Success") {
        //If user change password success, alert then reload the page
        if (!alert("Change password successful")) {
          window.location.reload(); 
        };  
      }
      else {
        //If user change password fail, pop up alert
        alert("Change password fail");
        return
      }
  });
}

//Add click button by press enter button
function checkKeyPress(key) {
  if (key.keyCode == 13) {
    changePasswordValidation();
  }
}

addEventListener("keypress", checkKeyPress);
document.getElementById("change-pass-button").addEventListener("click", changePasswordValidation);