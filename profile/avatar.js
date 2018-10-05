document.getElementById("avatar-input-field").addEventListener("change", submitAvatar);

function submitAvatar() {
    var avatar = document.getElementById("avatar-input-field").files;
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/upload-file", true);
    http.send(JSON.stringify(avatar));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
            alert(result);
        }
        if (result != "Fail!") {
            alert("Image has loaded!");
        }
    }
}