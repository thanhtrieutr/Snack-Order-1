export function getAvatar(url) {
    this.setState({
        avatar:url
    });
}

export function getName(obj) {
    let temp=this.state.userInfo;
    temp.name = obj;
    this.setState({
        userInfo:temp
    })
}

export function getBirthday(obj) {
    let temp = this.state.userInfo;
    temp.birthday = obj;
    this.setState({
        userInfo:temp
    })
}

export function getAddress(obj) {
    let temp = this.state.userInfo;
    temp.address = obj;
    this.setState({
        userInfo:temp
    })
}

export function getPhone(obj) {
    let temp=this.state.userInfo;
    temp.phone = obj;
    this.setState({
        userInfo:temp
    })
}