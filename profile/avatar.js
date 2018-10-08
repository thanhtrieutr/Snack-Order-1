document.getElementById("avatar-input-field").addEventListener("change", submitAvatar);

function submitAvatar() {
    var avatar = document.getElementById("avatar-input-field").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = function () {
        var http = new XMLHttpRequest();
        fileSend.append("file" , reader.result);
        fileSend.append("token" , 1234);
        var object = {
            file:reader.result,
            token:localStorage.getItem("token")
        };
        http.open('POST', "http://127.0.0.1:3000/upload-file", true);
        http.send(JSON.stringify(object));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.response);
            }
            if (result == "Success!") {
                alert("Image has loaded!");
            }
        }
    };  
}