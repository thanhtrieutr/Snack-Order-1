import React, { Component } from "react"; 
import ButtonBox from "./button.box";
import InfoBar from "./info.bar";
import {ProfileContext} from "../index"
import ErrorBar from "../../../components/Profile/error.bar";
class ProfileContainer extends Component {
    constructor() {
        super();
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
            <ProfileContext.Consumer>
                {(context) => {
                    return (
                        <div className="cl-xs-12 cl-md-9">
                            <div className="profile-content">
                                <div className="cl-xs-12 cl-md-12">
                                    <h2 className="profile-title">Change Password</h2>
                                    <InfoBar id="current-password" getValue={context.getCurrentPassword} value={context.passwordDetail.currentPassword} name="Current Password" ></InfoBar>
                                    <InfoBar id="new-password" getValue={context.getNewPassword} value={context.passwordDetail.newPassword} name="New Password" ></InfoBar>
                                    <InfoBar id="repeat-new-password" getValue={context.getConfirmPassword} value={context.passwordDetail.confirmPassword} name="Confirm Password"></InfoBar>
                                    <ErrorBar errorMessage={context.errorMessage} error={context.error}></ErrorBar>
                                    <ButtonBox history={this.props.history} changePassword={context.changePassword}></ButtonBox>
                                </div>
                            </div>
                        </div>
                    )}}
            </ProfileContext.Consumer>
        );
    }
}

export default ProfileContainer;