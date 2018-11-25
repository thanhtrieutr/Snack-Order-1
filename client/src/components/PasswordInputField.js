import React from 'react';

class PasswordInputField extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <input id={this.props.id} type="password" placeholder={this.props.placeholder} 
                name={this.props.name}  className={this.props.className}  
                onChange={this.props.onChangeHandle} required/>
            </div>
        );
    }
}

export default PasswordInputField;