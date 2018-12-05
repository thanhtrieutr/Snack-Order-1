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

export function changePass(dataFromInput) {
  this.setState({
    password: dataFromInput,
  })
}

export function changeCfmPass(dataFromInput) {
  this.setState({
    confirmPassword: dataFromInput,
  })
}
