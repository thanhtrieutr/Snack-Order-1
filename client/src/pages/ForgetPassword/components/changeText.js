export function changeEmail(evt) {
  this.setState({
    email: evt.target.value,
  })
}

export function changeCode(evt) {
  this.setState({
    code: evt.target.value,
  })
}

export function changePass(evt) {
  this.setState({
    password: evt.target.value,
  })
}

export function changeCfmPass(evt) {
  this.setState({
    confirmPassword: evt.target.value,
  })
}
