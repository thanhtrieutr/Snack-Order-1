import React, { Component } from "react"; 
import logo from '../../assets/images/logo.png'
class TitleBox extends Component {
    render(){
        return (
            <div className="title cl-xs-12">
                <img alt="imageAlt" container="logo-container" className="logo" src={logo} />
            </div>
        );
    }
}

export default TitleBox;