import React from 'react';
import logo from '../../../assets/images/logo.png'
class LogoField extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img className="logo cl-xs-12" src={logo} alt="logo"></img>
            </div>
        );
    }
}

export default LogoField;