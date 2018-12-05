import React from 'react';
import './status.scss'

export default class StatusField extends React.Component {
  render () {
    return (
      <div>
        <p className={this.props.stat}>{this.props.content}
          { this.props.stat === 'ms_success'?
           <a href={this.props.href}>Return to login</a> : null}
        </p>
      </div>
    )
  }
}
