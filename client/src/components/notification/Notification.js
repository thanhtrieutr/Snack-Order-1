import React from 'react';

export default class Notification extends React.Component {
  render () {
    return (
      <div className={`notification has-text-weight-bold ${this.props.className}`}>
        <button className="delete"></button>
        {this.props.content}
      </div>
    )
  }
}
