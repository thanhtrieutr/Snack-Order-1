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
    var temp = checkInput(this.state.passwordDetail.newPassword,this.state.passwordDetail.confirmPassword);
    if (temp <4) {
        var mess = [
            "New password is too long or too short",
            "Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}",
            "New password and repeat password are not match"
        ]
        this.setState({
            error:true,
		    errorMessage:mess[temp]
        })
        return;
    }
    this.setState({
        error:false,
        errorMessage:"None"
    })
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