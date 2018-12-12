import React, {Component} from 'react';

class LogoContainer extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src="../../../helpers/static/images/logo.png" className={this.props.className}></img>
            </div>
        );
    }
}

export default LogoContainer;