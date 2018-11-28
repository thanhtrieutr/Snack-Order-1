import React, { Component } from 'react';
import Input from './Input';

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
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label is-size-4">{this.props.label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <Input className={this.props.className} type={this.props.type} placeholder={this.props.placeholder} 
                value={this.props.value} changeText={this.changeText}/>
            </div>
          </div>
        </div> 
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