import React, { Component } from "react"; 
import ButtonBox from "./button.box";
import InfoBar from "./info.bar";

class ProfileContainer extends Component {
    constructor() {
        super();
        // this.changePassword = this.changePassword.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.checkKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.checkKeyPress);
    }

    checkKeyPress(event) {
        if (event.keyCode === 13) {
            this.props.changePassword();
        }
    }

    render(){
        return (
            <div className="cl-xs-12 cl-md-9">
                <div className="profile-content">
                    <div className="cl-xs-12 cl-md-12">
                        <h2 className="profile-title">Change Password</h2>
                        <InfoBar placeHolder="Enter your password" id="current-password" getValue={this.props.getCurrentPassword} value={this.props.passwordDetail.currentPassword} name="Current Password :" ></InfoBar>
                        <InfoBar placeHolder="Enter new password" id="new-password" getValue={this.props.getNewPassword} value={this.props.passwordDetail.newPassword} name="New Password :" ></InfoBar>
                        <InfoBar placeHolder="Confirm the password" id="repeat-new-password" getValue={this.props.getConfirmPassword} value={this.props.passwordDetail.confirmPassword} name="Confirm Password :"></InfoBar>
                        <ButtonBox history={this.props.history} changePassword={this.props.changePassword}></ButtonBox>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileContainer;