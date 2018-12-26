import {getUserInfo,sendNewInfo} from './script'
import {checkInput} from "./check.input";
import { errorAlert, successAlert } from '../../../helpers/utilities/alert';

export function userInfo() {
    getUserInfo(result => {
        if (result !== false) {
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
        if (result === false) {
            errorAlert("Change Password Fail");
        }
        else {
            successAlert("Change Password Success");
        }
    });
}