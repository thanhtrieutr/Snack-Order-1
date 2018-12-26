import React from 'react';
import {API_ROOT} from '../../../api-config'

class LogoField extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img className="logo cl-xs-12" src={`${API_ROOT}/static/images/logo.png`} alt="logo"></img>
            </div>
        );
    }
}

export default LogoField;