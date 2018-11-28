import React, { Component } from "react"; 
import NavChoose from "../../../components/Profile/nav.choose";

class NavigationBar extends Component {
    constructor() {
        super();
        this.changePassword = this.changePassword.bind(this);
        this.changeUserInfo = this.changeUserInfo.bind(this);
    }
    render(){
        return (
            <div className={this.props.class}>
                <ul className="nav">
                    <NavChoose class="active" redirect={this.changeUserInfo} name="Basic Information"></NavChoose>
                    <NavChoose redirect={this.changePassword} name="Change Password"></NavChoose>
                </ul>
            </div>
        );
    }
    changePassword() {
        this.props.history.push('/profile/change-password');
    }
    changeUserInfo() {
        this.props.history.push('/profile');
    }
}

export default NavigationBar;