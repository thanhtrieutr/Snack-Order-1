import React, { Component } from "react"; 
import logo from '../../assets/images/logo.png'
class TitleBox extends Component {
    render(){
        return (
            <div className="title cl-xs-12">
                <div className="logo-container">
                    <img alt="imageAlt" className="logo" src={logo} />
                </div> 
            </div>
        );
    }
}

export default TitleBox;