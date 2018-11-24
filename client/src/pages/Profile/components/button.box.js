import React, { Component } from "react"; 
import ButtonClick from "./button";
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
                {!this.props.editState ? <ButtonClick name="Change Info" buttonHandler = {this.props.changeInputStatus}></ButtonClick> 
                : <ButtonClick name="Save Info" buttonHandler = {this.props.saveInputStatus}></ButtonClick>}
            </div>
        );
    }

    ReturnButton() {
        this.props.history.push('/');
    }
}

export default ButtonBox;