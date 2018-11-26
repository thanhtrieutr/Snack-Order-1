import React, {Component} from 'react';

class UserInputField extends Component {
    constructor() {
        super();
        this.state ={
            term: ""
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.term
        })
    }
    render() {
        return (
            <input placeholder={this.props.placeholder} 
            id={this.props.id} 
            name={this.props.name} 
            className={this.props.className} 
            onChange={this._onChangeHandle} 
            value={this.state.value} 
            type="text" required>
            </input>
        );
    }
    _onChangeHandle(event) {
        this.props.onChangeHandle(event);
    }
}

export default UserInputField;