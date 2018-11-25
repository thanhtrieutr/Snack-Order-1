import React from 'react';

class UserInputField extends React.Component {
    constructor() {
        super();
        this.state ={
            value: ""
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }
    render() {
        return (
            <input type="text" placeholder={this.props.placeholder} id={this.props.id} 
            name={this.props.name} className={this.props.className} onChange={this._onChangeHandle} 
            value={this.state.value} required>
            </input>
        );
    }
    _onChangeHandle(event) {
        this.props.onChangeHandle(event);
    }
}

export default UserInputField;