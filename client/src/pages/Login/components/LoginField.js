import React from 'react';
import SubmitButton from '../../../components/SubmitButton'
import 'font-awesome/css/font-awesome.min.css';
import {FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'

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
                <FormGroup>
                    <ControlLabel bsClass="login-label">Email</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="user"></Glyphicon>
                        </InputGroup.Addon>
                        <FormControl type="text" placeholder="Email" onChange={this.onChangeUserHandle}></FormControl>
                    </InputGroup>
                    </FormGroup>

                <FormGroup>
                    <ControlLabel bsClass="login-label">Password</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="lock"></Glyphicon>
                        </InputGroup.Addon>
                        <FormControl type="password" placeholder="password" onChange={this.onChangePasswordHandle}></FormControl>
                    </InputGroup>
                </FormGroup>

                <div className="login-button">
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
        fetch('http://127.0.0.1:3000/user-controller/check-login', {
            method: 'POST', // POST, DELETE, PUT,
            body: JSON.stringify(account) // object
        }).then(response => {
            if (response.status === 200) {
                response.json().then(token => {
                    //flag current account      
                    localStorage.setItem("userAccount", this.state.user);
                    localStorage.setItem("token", token);
                    //redirect
                    alert("Login Success");
                    window.location.href = "/";
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