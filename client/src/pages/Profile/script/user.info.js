import {getUserInfo,sendNewUserInfo} from './script'
import { errorAlert, successAlert } from '../../../helpers/utilities/alert';

export function setUserInfo() {
    getUserInfo(result => {
        if (result !== false) {
            this.setState({
                userInfo: {
                    name: result.fullName,
                    birthday: result.birthday,
                    phone: result.phoneNumber,
                    address: result.address,
                },
                avatar: result.avatarAddress
            })
        }
    })
}

export function uploadNewInfo() {
    var obj = {};
    obj.fullName = this.state.userInfo.name;
    obj.phoneNumber = this.state.userInfo.phone;
    obj.address = this.state.userInfo.address;
    obj.birthday = this.state.userInfo.birthday;
    sendNewUserInfo(obj,result => {
        if (result === false) {
            errorAlert("Update Fail");
        }
        else {
            successAlert("Update Success");
        }
    });
}