//loadUser function for initialize user list
function loadUser() {
  //Using utilities variables from admin.js
  userRank = 0;
  var choiceList = document.getElementsByClassName("choice");
  for (var i = 0; i < choiceList.length; i++) {
      choiceList[i].className = choiceList[i].className.replace(" is-active", "");
  }
  var currentChoice = document.getElementById("users");
  currentChoice.className = currentChoice.className + " is-active";
  //Calling removeAll function from admin.js
  removeAll();
  //Send request to admin API server to fetch user data
  //Promise sector
  var loadUsers = new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:3000/admin-controller/get-users", true);
      var obj = {};
      obj.token = localStorage.getItem("token");
      http.send(JSON.stringify(obj));
      http.onload = () => resolve(http.response);
      http.onerror = () => reject(http.response);
  });

  //If success then send data to client side
  loadUsers.then((response) => {
      //Parsing response data and placing it to user detail information
      var listUser = JSON.parse(response);
      var contentContainer = document.getElementById("user-content");
      if (contentContainer.style.display == "none" || contentContainer.style.display == "") {
          contentContainer.style.display = "block";
      }
      listUser.forEach(user => {
          var newUser = createNewUser(user, user._id);
          contentContainer.appendChild(newUser);
      });
      document.getElementById("product-content").style.display = "none";
  }).catch((error) => {
      //Calling alertError function from utilitiesFunction.js
      alertError(error);
  });
}

//Function create modal to check user information with user database
function createNewUser(user, currentID) {
  //Using utilities variable from admin.js
  userRank++;
  //Initializing user detail information list element
  var newUser = document.createElement('div');
  var userDetail = document.createElement('div');
  userDetail.innerHTML = 
  `<div id="display-container" onclick="showModal('user-detail-${userRank}', 'user-detail-label')">
      <table class="table is-fullwidth">
          <td class="display-item" style="width: 100%;">${user.user}</td>
      </table>
  </div>`
  //Creating new modal box element of user detail information
  var userTable = document.createElement('div');
  userTable.innerHTML = 
  `<div id="user-detail-${userRank}" class="modal">
      <div class="columns is-mobile">
          <div class="modal-background"></div>
          <div class="modal-card">
              <header class="modal-card-head">
                  <p class="modal-card-title"> <b> User Information </b> </p>
              </header>
              <section class="modal-card-body">
              <div class="columns">
                  <div id="profile-user-picture" class="column is-5">
                      <div id="profile-description"> <u> <b> Profile Picture </b> </u> </div>
                      <div id="profile-border-box">
                          <img id="avatar" class="avatar" src=${user.avatarAddress} alt="User Avatar">
                      </div>
                  </div>
              <div id="profile-user-information" class="column is-7">
                  <div id="profile-description"> <u> <b> Profile Information </b> </u> </div>
                  <div id="user-information-box" class="is-multiline">
                      <div id="user-information" class="columns is-mobile">
                          <div class="property column is-3"> <b> Name: </b> </div>
                          <div class="description column is-9">${user.fullName} </div>
                      </div>  
                      <div id="user-information" class="columns is-mobile">
                          <div class="property column is-3"> <b> Email:</b> </div>
                          <div class="description column is-9"> ${user.user} </div>
                      </div>  
                      <div id="user-information" class="columns is-mobile">
                          <div class="property column is-3"> <b> Phone:</b> </div>
                          <div class="description column is-9"> ${user.phoneNumber} </div>
                      </div> 
                      <div id="user-information" class="columns is-mobile">
                          <div class="property column is-3"> <b> Birthday:</b> </div>
                          <div class="description column is-9"> ${user.birthday} </div>
                      </div> 
                      <div id="user-information" class="columns is-mobile">
                          <div class="property column is-3"> <b> Address:</b> </div>
                          <div class="description column is-9"> ${user.address} </div>
                      </div>          
              </div>
              </section>
              <footer class="modal-card-foot">
                  <button class="button" onclick="closeModal('user-detail-${userRank}', 'user-detail-label')"> <b> Close </b> </button>
              </footer>
          </div>
      </div>
  </div>`
  newUser.appendChild(userDetail);
  newUser.appendChild(userTable);
  return newUser;
}