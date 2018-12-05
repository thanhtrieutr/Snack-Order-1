import {getUserInfo,sendNewInfo} from './script'
import {checkInput} from "./check.input";

export function userInfo() {
    getUserInfo(result => {
        if (result != false) {
            this.setState({
                avatar: result.avatarAddress
            })
        }
    })
}

export function changePassword() {
    if (!checkInput(this.state.passwordDetail.newPassword,this.state.passwordDetail.confirmPassword)) {
        return;
    }
    var obj = {};
    obj.oldPassword = this.state.passwordDetail.currentPassword;
    obj.newPassword = this.state.passwordDetail.newPassword;
    sendNewInfo(obj,result => {
        if (result == false) {
            alert("Change Password Fail");
        }
        else {
            alert("Change Password Success");
        }
    });
}