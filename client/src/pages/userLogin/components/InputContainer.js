import React, {Component} from 'react';
import UserInputField from './UserInputField';
import PasswordInputField from './PasswordInputField';
import '../../../helpers/bootstrap/build-column.css';
import '../../../helpers/bootstrap/off-set.css';
import LogInButton from './LogInButton';
import {Col, Row, Grid} from 'react-bootstrap';

class InputContainer extends Component {
    constructor() {
        super();
        this.state = {
            termUser: "",
            termPassword: ""
        }
        this.onChangeHandlePassword = this.onChangeHandlePassword.bind(this);
        this.onChangeHandleUser = this.onChangeHandleUser.bind(this);
        this.submitButtonHandle = this.submitButtonHandle.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keypress', this.checkKeyPress);
    }
    render() {
        return (
            <Col className="container" xs={6} xsOffset={3} >
                <h3>Email</h3>
                <UserInputField 
                id="input-user" placeholder="&#xf007; * Email" 
                name="user" 
                onChangeHandle={this.onChangeHandleUser}>
                </UserInputField>
                <h3>Password</h3>
                <PasswordInputField id="input-password" 
                placeholder="&#xf023; * Password (8-16 characters)"
                name="password" 
                onChangeHandle={this.onChangeHandlePassword}>
                </PasswordInputField>
                <div className="button">
                    <LogInButton id="signin-button" 
                    onClickHandle={this.submitButtonHandle}>
                    Sign In</LogInButton>
                </div>
                <h4 id = "redirect-register"> Don't you have an account?
                    <a id = "link-signup" href="#"> We got you </a>
                </h4>
            </Col>
        );
    }
    checkKeyPress(key) {
        if (key.keyCode === 13) {
            this.submitButtonHandle();
        }
    }
    submitButtonHandle() {
        var account =  {
            user: this.state.user,
            password: this.state.password
        }
        fetch('http://127.0.0.1:3000/user-controller/check-login', {
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            method: 'POST',
            body: JSON.stringify(account)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(token => {
                    var localUser = [];
                    var currentUser = {};
                    currentUser.user = this.state.user;
                    currentUser.cartArray = [];
                    localUser.push(currentUser);
                    localStorage.setItem("accountArray", JSON.stringify(localUser));
                    localStorage.setItem("currentAccount", this.state.user);
                    localStorage.setItem("token", token);
                    window.location.href = '/';
                });
            } else {
                alert("Your input or password is not correct")
            }
        })
    }
    onChangeHandleUser(event) {
        this.setState(
            {
                user: event.target.value
            }
        );
    }
    onChangeHandlePassword(event) {
        this.setState(
            {
                password: event.target.value
            }
        );
    }
}


export default InputContainer