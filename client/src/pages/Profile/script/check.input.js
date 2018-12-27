export function checkValidPhone(telephone) {
    if (telephone === "" || telephone === null) {
        return true;
    }
    else return /^[0-9\s- ]{8,13}$/.test(telephone);
}

export function checkValidFullName(fullName) {
    if (fullName === "" || fullName === null) {
        return true;
    }
    else return /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName);
}

export function checkValidBirthday(birthday) {
    if (birthday === "" || birthday === null) {
        return true;
    }
    else return /\b(?:(?:0[1-9]|1\d|2[0-8]|[1-9])\/(?:0?2)\/(?:\d+)|(?:0[1-9]|1\d|2\d|[1-9])\/(?:0?2)\/(?:(?:\d*?(?:(?:0[48]|[13579][26]|[2468][048])|(?:(?:[02468][048]|[13579][26])00))|[48]00|[48])(?=\D|\b))|(?:0[1-9]|1\d|2\d|30|[1-9])\/(?:0?[469]|11)\/(?:\d+)|(?:0[1-9]|1\d|2\d|3[01]|[1-9])\/(?:0?[13578]|1[02])\/(?:\d+))\b/.test(birthday);
}
export function checkValidAddress(address) {
    if (address === "" || address === null) {
        return true;
    } 
    else return /^\s*\S+(?:\s+\S+){1}/.test(address);
}

export function checkInput(userInfo) {
    if (checkValidPhone(userInfo.phone) && checkValidAddress(userInfo.address) && checkValidBirthday(userInfo.birthday) && checkValidFullName(userInfo.name)) {
        return true;
    }
    return false;
}