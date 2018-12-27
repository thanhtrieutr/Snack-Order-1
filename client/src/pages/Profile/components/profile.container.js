import React, { Component } from "react"; 
import ButtonBox from "./button.box";
import InfoBar from "./info.bar";
import {checkInput} from "../script/check.input";
import {ProfileContext} from "../index";
import ErrorBar from "../../../components/Profile/error.bar";
import { errorAlert } from "../../../helpers/utilities/alert";
class ProfileContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputStatus: false
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);
        this.changeSave = this.changeSave.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.checkKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.checkKeyPress);
    }

    checkKeyPress(event) {
        if (event.keyCode === 13) {
            if (this.state.inputStatus) {
                this.saveStatus();
            }
        }
    }

    changeStatus() {
        this.setState({
            inputStatus: true
        })
    }
    changeSave() {
        this.setState({
            inputStatus: false
        })
    }

    render(){
        return (
            <ProfileContext.Consumer>
                {(context) => {
                    var change = this.changeSave;
                    function saveStatus() {
                        if (context.nameError || context.phoneError || context.addressError || context.birthdayError) {
                            errorAlert("Input Invalid");
                            return;
                        }
                        change();
                        context.uploadNewInfo();
                    }
                    return (
                        <div className="cl-xs-12 cl-md-9">
                            <div className="profile-content">
                                <div className="cl-xs-12 cl-md-12">
                                    <h2 className="profile-title">Profile</h2>
                                    <InfoBar placeHolder=" Ex. John Doe" id="user-fullname" getValue={context.getName} value={context.userInfo.name} name="Name:" editState={this.state.inputStatus}></InfoBar>
                                    <ErrorBar errorMessage="Must consist of Alphabetical character only" error={context.nameError}></ErrorBar>
                                    <InfoBar placeHolder=" Ex. 0123456789" id="user-phonenumber" getValue={context.getPhone} value={context.userInfo.phone} name="Phone:" editState={this.state.inputStatus}></InfoBar>
                                    <ErrorBar errorMessage="Must consist of Number only" error={context.phoneError}></ErrorBar>
                                    <InfoBar placeHolder=" Ex. 1/1/2000" id="user-birthday" getValue={context.getBirthday} value={context.userInfo.birthday} name="Birthday:" editState={this.state.inputStatus}></InfoBar>
                                    <ErrorBar errorMessage="Must follow format XX/XX/XX and number only" error={context.birthdayError}></ErrorBar>
                                    <InfoBar placeHolder=" Ex. Some Address 123" id="user-address" getValue={context.getAddress} value={context.userInfo.address} name="Address:" editState={this.state.inputStatus}></InfoBar>
                                    <ErrorBar errorMessage="Must longer than 2 words and Alphabetical , Number character only" error={context.addressError}></ErrorBar>
                                    <ButtonBox history={this.props.history} changeInputStatus={this.changeStatus} saveInputStatus={saveStatus} editState={this.state.inputStatus}></ButtonBox>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProfileContext.Consumer>
        );
    }
}

export default ProfileContainer;