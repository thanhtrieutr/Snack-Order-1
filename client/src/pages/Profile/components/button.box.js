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
                <div className="cl-sm-1"></div>
                {!this.props.editState ? <ButtonClick name="Change Info" buttonHandler = {this.props.changeInputStatus} class="cl-xs-12 offset-sm-2 cl-sm-4 offset-md-2 cl-md-4"></ButtonClick> 
                : <ButtonClick name="Save Info" buttonHandler = {this.props.saveInputStatus}class="cl-xs-12 offset-sm-2 cl-sm-4 offset-md-2 cl-md-4"></ButtonClick>}
            </div>
        );
    }

    ReturnButton() {
        this.props.history.push('/');
    }
}

export default ButtonBox;