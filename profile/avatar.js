document.getElementById("avatar-input-field").addEventListener("change", submitAvatar);

function submitAvatar() {
    var avatar = document.getElementById("avatar-input-field").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = function () {
        var http = new XMLHttpRequest();
        var object = {
            file:reader.result,
            token:localStorage.getItem("token"),
            fileName: avatar.name
        };
        http.open('POST', "http://127.0.0.1:3000/controller/upload-file", true);
        http.send(JSON.stringify(object));
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
    };  
}