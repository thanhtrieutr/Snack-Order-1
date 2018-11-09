//Implement function of uploading file in multipart/dataform
document.getElementById("avatar-input-field").addEventListener("change", function(event) {
    //If don't have event.preventDefault(), uploading process will be automatically run
    //Solution will be optimized
    event.preventDefault();
    //Get user's token from local storage
    var token = localStorage.getItem("token");
    //Get only 1 uploaded file from uploader
    var file = document.getElementById("avatar-input-field").files[0];
    //Select form in profile.html
    var userForm = document.querySelector("form");
    var userFormData = new FormData(userForm);
    //Append file data to new FormData which gathered data from uploader
    userFormData.append("file", file);
    //Open new request and send POST request to user's API controller 
    var http = new XMLHttpRequest;
    http.open('POST', "http://127.0.0.1:3000/user-controller/upload-file", true);
    //Set user's token to request header
    http.setRequestHeader("token", token);
    //Send multipart/dataform to server-side
    http.send(userFormData);
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response != "Wrong Data Input") {
                alert("Image has loaded!");
                loadUserData();
                }
            }
        else if (this.readyState == 4 && this.status != 200) {
            alertError(this.response);
        }
    }
});