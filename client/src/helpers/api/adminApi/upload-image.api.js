import {_helper} from '../_helper';

export function uploadProfileImage(event , callback) {
  //If don't have event.preventDefault(), uploading process will be automatically run
  //Solution will be optimized
  event.preventDefault();
  //Get user's token from local storage
  var token = localStorage.getItem("token");
  //Get only 1 uploaded file from uploader
  var file = document.getElementById("product-image-input-field").files[0];
  //Select form in profile.html
  var userForm = document.querySelector("form");
  var userFormData = new FormData(userForm);
  //Append file data to new FormData which gathered data from uploader
  userFormData.append("file", file);
  //Open new request and send POST request to user's API controller 
  
  fetch("http://127.0.0.1:3000/admin-controller/upload-product/image",{
      method: "POST",
      body: userFormData,
      headers : {
          "token": token
      }
  }).then(response => {
      if (response.status === 200) {
          callback(true);
      }
      else {
          callback(false);
      }
  }) 
};