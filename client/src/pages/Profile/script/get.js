import { checkValidFullName, checkValidBirthday, checkValidAddress, checkValidPhone } from "./check.input";


export function getAvatar(url) {
    this.setState({
        avatar:url
    });
}

export function getName(obj) {
    debugger;
    let temp=this.state.userInfo;
    let error = checkValidFullName(obj);
    temp.name = obj;
    this.setState({
        userInfo:temp,
        nameError:!error
    })
}

export function getBirthday(obj) {
    let temp = this.state.userInfo;
    let error = checkValidBirthday(obj);
    temp.birthday = obj;
    this.setState({
        userInfo:temp,
        birthdayError:!error
    })
}

export function getAddress(obj) {
    let temp = this.state.userInfo;
    let error = checkValidAddress(obj);
    temp.address = obj;
    this.setState({
        userInfo:temp,
        addressError:!error
    })
}

export function getPhone(obj) {
    let temp=this.state.userInfo;
    let error = checkValidPhone(obj);
    temp.phone = obj;
    this.setState({
        userInfo:temp,
        phoneError:!error
    })
}