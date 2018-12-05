import React from 'react';
import UserInputField from '../../../components/UserInputField';
import PasswordInputField from '../../../components/PasswordInputField'
import SubmitButton from '../../../components/SubmitButton'
import 'font-awesome/css/font-awesome.min.css';

class LoginField extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            password: ""
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
                <h3>Email</h3>
                <UserInputField id="input-user" placeholder="&#xf007; * Email" name="user" 
                onChangeHandle={this.onChangeUserHandle}/>
                <h3>Password</h3>
                <PasswordInputField id="input-password" placeholder="&#xf023; * Password (8-16 characters)"
                name="password" onChangeHandle={this.onChangePasswordHandle}/>
                <div className="button">
                    <SubmitButton id="signin-button" content="Sign in" onClickHandle={this.submitButtonHandle}></SubmitButton>
                </div>
            </div>
        );
    }
    submitButtonHandle() {
        var account = {
            user: this.state.user,
            password: this.state.password
        }
        fetch('http://127.0.0.1:3000/admin-controller/check-login', {
            method: 'POST', // POST, DELETE, PUT,
            body: JSON.stringify(account) // object
        }).then(response => {
            if (response.status === 200) {
                response.json().then(token => {
                    //flag current account      
                    localStorage.setItem("adminAccount", this.state.user);
                    localStorage.setItem("token", token);
                    //redirect
                    alert("Login Success");
                    window.location.href = "/admin";
                });
            }
            else {
                alert('Email or password does not match!');
            }
        })
    }
    onChangeUserHandle(event) {
        this.setState({
            user: event.target.value
        });
    }
    onChangePasswordHandle(event) {
        this.setState({
            password: event.target.value
        });
    }
    checkKeyPress(key) {
        if (key.keyCode === 13) {
            this.submitButtonHandle();
        }
    }
}

export default LoginField