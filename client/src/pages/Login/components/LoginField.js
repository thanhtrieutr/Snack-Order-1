import React from 'react';
import SubmitButton from '../../../components/SubmitButton'
import 'font-awesome/css/font-awesome.min.css';
import {FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon, HelpBlock} from 'react-bootstrap'
import {API_ROOT} from '../../../api-config'
import {emailCheckClearly, passwordCheckClearly} from '../../../helpers/utilities/validate.input'
import {errorAlert} from '../../../helpers/utilities/alert'
class LoginField extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            password: "",
            stateInput: null,
            statePassword: null,
            helpInput: null,
            helpPassword: null
        }
        this.onChangeUserHandle = this.onChangeUserHandle.bind(this);
        this.onChangePasswordHandle = this.onChangePasswordHandle.bind(this);
        this.submitButtonHandle = this.submitButtonHandle.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keypress', this.checkKeyPress);
    }
    render() {
        return (
            <div className="container cl-xs-12">
                <FormGroup validationState={this.state.stateInput}>
                    <ControlLabel bsClass="login-label">Email</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="user"></Glyphicon>
                        </InputGroup.Addon>
                        <FormControl type="text" placeholder="Email" onChange={this.onChangeUserHandle}></FormControl>
                        <FormControl.Feedback />
                    </InputGroup>
                    
                    {this.createHelp(this.state.helpInput)}
                </FormGroup>

                <FormGroup validationState={this.state.statePassword}>
                    <ControlLabel bsClass="login-label" id="password-login-label">Password</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="lock"></Glyphicon>
                        </InputGroup.Addon>
                        <FormControl type="password" placeholder="password" onChange={this.onChangePasswordHandle}></FormControl>
                        <FormControl.Feedback />
                    </InputGroup>

                    {this.createHelp(this.state.helpPassword)}
                </FormGroup>

                <div className="login-button">
                     <SubmitButton id="signin-button" content="Sign in" onClickHandle={this.submitButtonHandle}></SubmitButton>
                </div>
                <div className="forget-password-dir">
                    <span>Forgot your password?</span> 
                    <a href="/forget-password"> Reset it here.</a>
                </div>
            </div>
        );
    }
    createHelp(message) {
        if (message ===  null)
            return null;
        else return <HelpBlock>{message}</HelpBlock>
    }
    checkInput(callback) {
        let check = emailCheckClearly(this.state.user);
        let newState = {
            stateInput: "error",
            helpInput: null,
            statePassword: "error",
            helpPassword: null
        };
        if (check === false) {
            newState.helpInput = "It must follow email format";
        }
        if (check === -1) {
            newState.helpInput = "Username's too short";
        }
        if (check === -2) {
            newState.helpInput = "Username's too long";
        }
        if (check === true) {
            newState.stateInput = null;
        } 
        check = passwordCheckClearly(this.state.password);
        if (check === false) {
            newState.helpPassword = "It should't contain special character";
        }
        if (check === -1) {
            newState.helpPassword = "Password's too short";
        }
        if (check === -2) {
            newState.helpPassword = "Password's too long";
        }
        if (check === true) {
            newState.statePassword = null;
        } 
        this.setState(newState, callback);
    }
    submitButtonHandle() {
        this.checkInput(() => {
            if (this.state.stateInput !== null || this.state.statePassword !== null) {
                return;
            }
            var account = {
                user: this.state.user,
                password: this.state.password
            }
            fetch(`${API_ROOT}/user-controller/check-login`, {
                method: 'POST', // POST, DELETE, PUT,
                body: JSON.stringify(account) // object
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(token => {
                        //flag current account      
                        localStorage.setItem("userAccount", this.state.user);
                        localStorage.setItem("token", token);
                        //redirect
                        window.location.href='/';
                    });
                }
                else {
                    errorAlert('Email or password does not match!');
                }
            })
        });
    }
    onChangeUserHandle(event) {
        this.setState({
            user: event.target.value,
            stateInput: null,
            helpInput: null
        });
    }
    onChangePasswordHandle(event) {
        this.setState({
            password: event.target.value,
            statePassword: null,
            helpPassword: null
        });
    }
    checkKeyPress(key) {
        if (key.keyCode === 13) {
            this.submitButtonHandle();
        }
    }
}

export default LoginField