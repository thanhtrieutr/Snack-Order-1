import React, { Component } from "react"; 
import ButtonClick from "../../../components/Profile/button";
// import { Link } from react-router-dom;

class ButtonBox extends Component {
    constructor() {
        super();
        this.state = {
            changeStatus: true
        }
        this.ReturnButton = this.ReturnButton.bind(this);
    }

    render(){
        return (
            <div className="button">
                <ButtonClick name="Return to Homepage" buttonHandler = {this.ReturnButton}></ButtonClick>
                <ButtonClick name="Change Password" buttonHandler = {this.props.changePassword}></ButtonClick>
            </div>
        );
    }

    ReturnButton() {
        this.props.history.push('/');
    }
}

export default ButtonBox;