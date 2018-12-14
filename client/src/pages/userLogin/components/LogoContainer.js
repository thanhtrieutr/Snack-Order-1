import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

class LogoContainer extends Component {
    render() {
        return (
            <Col className="logo-container" xs={5} xsOffset={4}>
                <img src="http://127.0.0.1:3000/static/images/logo.png" alt="logo" className="logo"></img>
            </Col>
        );
    }
}

export default LogoContainer;