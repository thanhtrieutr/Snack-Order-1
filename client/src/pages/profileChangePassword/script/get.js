export function getAvatar(url) {
    this.setState({
        avatar:url
    });
}

export function getCurrentPassword(obj) {
    let temp=this.state.passwordDetail;
    temp.currentPassword = obj;
    this.setState({
        passwordDetail:temp
    })
}

export function getNewPassword(obj) {
    let temp=this.state.passwordDetail;
    temp.newPassword = obj;
    this.setState({
        passwordDetail:temp
    })
}

export function getConfirmPassword(obj) {
    let temp=this.state.passwordDetail;
    temp.confirmPassword = obj;
    this.setState({
        passwordDetail:temp
    })
}