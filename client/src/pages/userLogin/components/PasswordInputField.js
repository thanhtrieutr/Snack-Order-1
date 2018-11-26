import React, {Component} from 'react';

class PasswordInputField extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <input 
                id={this.props.id} 
                type="password" 
                placeholder={this.props.placeholder} 
                name={this.props.name}  
                className={this.props.className}  
                onChange={this.props.onChangeHandle} required>
                </input>
            </div>
        );
    }
}

export default PasswordInputField;