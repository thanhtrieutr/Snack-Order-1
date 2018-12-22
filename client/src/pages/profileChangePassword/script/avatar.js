//Implement function of uploading file in multipart/dataform
import {getUserInfo} from './script'
import {API_ROOT} from '../../../api-config'

export function uploadImage(event , callback) {
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

    fetch(`${API_ROOT}/user-controller/upload-file`, {
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

export function avatarHandler(event) {
    uploadImage(event,result => {
        if (result) {
            alert("Image has loaded!");
            getUserInfo(result => {
                debugger;
                if (result !== false) {
                    this.setState({
                        avatar: result.avatarAddress
                    })
                }
            })
        }
        else {
            alert("Upload Avatar Fail!");
        }
    })
}
