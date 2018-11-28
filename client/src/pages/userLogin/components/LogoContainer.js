import React, {Component} from 'react';

class LogoContainer extends React {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="logo-container">
                <img src="link-of-img-logo" className="logo bulma-here"></img>
            </div>
        );
    }
}

export default LogoContainer;