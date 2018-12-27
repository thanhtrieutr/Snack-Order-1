import React, { Component } from "react"; 
import {Alert} from "react-bootstrap"

class ErrorBar extends Component {
    render(){
        return (
            <div className="error-bar">
                <div className="cl-xs-8 offset-xs-4 offset-md-3">
                    {this.props.error ? 
                    <div className="cl-xs-12 cl-sm-9 cl-md-10 error-field">
                        <Alert bsStyle="danger">
                            {this.props.errorMessage} 
                        </Alert>
                    </div>
                    : null}
                </div>
            </div>
        );
    }
}

export default ErrorBar;