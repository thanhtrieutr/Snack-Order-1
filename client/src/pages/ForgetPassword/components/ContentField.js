import React from 'react';

export default class ContentField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.stat,
      emailValidate: false,
      tokenValidate: false,
      passwordValidate: false
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.stat !== prevState.step) {
      return { step: nextProps.stat};
    }
    else return null;
  }
  render () {
    return (
      <div>
        <h1>Can't sign in? Forget your password?</h1>
        { this.state.step === 1 ? <p>Please enter your registered email address in the box below.</p> : null }
        { this.state.step === 2 ? <p>A vaidation token will send to you.
          Once you have received the token, enter it in the box below.</p> :null }
        { this.state.step === 3 ? <p>To reset your password, please enter 
          new password in both fields.</p> : null }
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.stat !== this.props.stat){
      this.setState({ step : this.props.stat});
    }
  }
}
