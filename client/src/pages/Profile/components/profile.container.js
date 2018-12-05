import React, { Component } from "react"; 
import ButtonBox from "./button.box";
import InfoBar from "./info.bar";
import {checkInput} from "../script/check.input";

class ProfileContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputStatus: false,
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.saveStatus = this.saveStatus.bind(this);
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

    saveStatus() {
        if (!checkInput(this.props.userInfo)) {
            alert("Input Invalid");
            return;
        }
        this.setState({
            inputStatus: false
        });
        this.props.uploadNewInfo()
    }

    render(){
        return (
            <div className="cl-xs-12 cl-md-9">
                <div className="profile-content">
                    <div className="cl-xs-12 cl-md-12">
                        <h2 className="profile-title">Profile</h2>
                        <InfoBar placeHolder=" Ex. John Doe" id="user-fullname" getValue={this.props.getName} value={this.props.userInfo.name} name="Name:" editState={this.state.inputStatus}></InfoBar>
                        <InfoBar placeHolder=" Ex. 0123456789" id="user-phonenumber" getValue={this.props.getPhone} value={this.props.userInfo.phone} name="Phone:" editState={this.state.inputStatus}></InfoBar>
                        <InfoBar placeHolder=" Ex. 1/1/2000" id="user-birthday" getValue={this.props.getBirthday} value={this.props.userInfo.birthday} name="Birthday:" editState={this.state.inputStatus}></InfoBar>
                        <InfoBar placeHolder=" Ex. Some Address 123" id="user-address" getValue={this.props.getAddress} value={this.props.userInfo.address} name="Address:" editState={this.state.inputStatus}></InfoBar>
                        <ButtonBox history={this.props.history} changeInputStatus={this.changeStatus} saveInputStatus={this.saveStatus} editState={this.state.inputStatus}></ButtonBox>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileContainer;