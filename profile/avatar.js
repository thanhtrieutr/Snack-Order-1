document.getElementById("avatar-input-field").addEventListener("change", submitAvatar);

function submitAvatar() {
    var avatar = document.getElementById("avatar-input-field").files[0];
    var token = localStorage.getItem("token");
    var http = new XMLHttpRequest();
    var fileSend = new FormData();
    fileSend.append("file" , avatar);
    // fileSend.append("token" , token);
    debugger;
    http.open('POST', "http://127.0.0.1:3000/upload-file", true);
    http.send(fileSend);
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
        }
        if (result == "Success!") {
            alert("Image has loaded!");
        }
    }
}