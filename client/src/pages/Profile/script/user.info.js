import {getUserInfo,sendNewUserInfo} from './script'

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
            alert("Update Fail");
        }
        else {
            alert("Update Success");
        }
    });
}