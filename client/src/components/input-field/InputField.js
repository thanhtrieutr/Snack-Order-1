import React, { Component } from 'react';
import Input from '../input/Input';

class InputField extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    }
    this.returnValue = this.returnValue.bind(this);
    this.changeText = this.changeText.bind(this);
  }
  render () {
    return (
      <div>
        <label>{this.props.label}</label>
        <Input type={this.props.type} placeholder={this.props.placeholder} name={this.props.name} 
              value={this.props.value} changeText={this.changeText}/>
      </div>
    )
  }
  changeText(evt) {
    this.setState({ inputValue: evt.target.value }, () => {
      this.returnValue();
    })
  }
  returnValue = () => {
    var editText = this.state.inputValue;
    this.props.changeText(editText);
  }
}

export default InputField;