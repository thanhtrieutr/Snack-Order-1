import React, {Component} from 'react';

class LoginButton extends Component {
    render() {
        return (
            <button 
            id={this.props.id} 
            onClick={this.props.onClickHandle}
            className={this.props.className}
            type="submit" >{this.props.children}</button>
        );
    }
}

export default LoginButton;