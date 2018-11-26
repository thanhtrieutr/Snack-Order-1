import React, {Component} from 'react';
import UserInputField from './UserInputField';
import PasswordInputField from './PasswordInputField';
import LogInButton from './LogInButton';

class InputContainer extends Component {
    constructor() {
        super();
        this.state = {
            termUser: "",
            termPassword: ""
        }
        this.onChangeHandlePassword = this.onChangeHandlePassword.bind(this)
        this.onChangeHandleUser = this.onChangeHandleUser.bind(this)
    }
    render() {
        return (
            <div>
                <h3>Email</h3>
                <UserInputField 
                id="input-user" placeholder="&#xf007; * Email" 
                name="user" 
                onChangeHandle={this.onChangeUserHandle}>
                </UserInputField>
                <h3>Password</h3>
                <PasswordInputField id="input-password" 
                placeholder="&#xf023; * Password (8-16 characters)"
                name="password" 
                onChangeHandle={this.onChangePasswordHandle}>
                </PasswordInputField>
                <div className="button">
                    <LogInButton id="signin-button" 
                    onClickHandle={this.submitButtonHandle}>
                    Sign In</LogInButton>
                </div>
            </div>
        );
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