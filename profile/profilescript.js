var localAccount = JSON.parse(localStorage.getItem("accountArray"));
var currentAccount = localStorage.getItem("currentAccount");
var token = localStorage.getItem("token");
var isChangeMode;

function loadUserData() {
    var avatar = document.getElementById("avatar");
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/get-user-info", true);
    var obj = {};
    obj.token = token;
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.response);
            if (result.avatarAddress) {
                avatar.setAttribute("src", result.avatarAddress);    
            }             
        }
    };
}

checkLogIn();
loadUserData();

// function alertUserinChangingProfile() {
//     alert("This feature is in development");
// }
// function checkValidTelephone(telephone) {
//     if (telephone == "" || telephone == null) {
//         return true;
//     }
//     if (telephone.length < 8 || telephone.length > 15) {
//         return false;
//     }
//     var pattern = /[0-9]/g;
//     var number = telephone.match(pattern);
//     if (number.length < 8 || number.length > 12) {
//         return false;
//     }
//     return /^[0-9- ]+$/.test(telephone);
// }


// // function checkKeyPress(key) {
// //     if (key.keyCode == 13 ) {
// //         goToNormalMode(true);
// //     }
// // }
// // addEventListener("keypress",checkKeyPress);