import React, { Component } from "react"; 
import Link from "../../../../../components/Home/link";
import ButtonClick from "../../../../../components/Home/button";

class UserBar extends Component {
    constructor() {
		super();
        this.UserProfile = this.UserProfile.bind(this);
	}
    render(){
        return (
            <div className="cl-md-4" id="user-bar" >
                <Link redirect={this.UserProfile} id="user-name" content={this.props.user}></Link>   
                <ButtonClick id="log-out-button" content="Log Out" buttonHandler={this.props.buttonHandler} ></ButtonClick>
            </div>
        );
    }
    UserProfile() {
        this.props.history.push('/profile');
    }
}

export default UserBar;