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
                <ButtonClick class="cl-xs-12 offset-sm-1 cl-sm-4 offset-md-1 cl-md-4" name="Return to Homepage" buttonHandler = {this.ReturnButton}></ButtonClick>
                <ButtonClick class="cl-xs-12 offset-sm-2 cl-sm-4 offset-md-2 cl-md-4"name="Change Password" buttonHandler = {this.props.changePassword}></ButtonClick>
            </div>
        );
    }

    ReturnButton() {
        this.props.history.push('/');
    }
}

export default ButtonBox;