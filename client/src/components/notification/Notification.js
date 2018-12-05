import React, { Component } from 'react';

class Notification extends Component {
  render () {
    return (
      <div className={`notification has-text-weight-bold ${this.props.className}`}>
        <button className="delete"></button>
        {this.props.content}
      </div>
    )
  }
}

export default Notification;