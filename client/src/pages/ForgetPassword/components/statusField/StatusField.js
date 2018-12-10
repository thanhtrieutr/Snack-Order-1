import React from 'react';
import { Alert } from 'react-bootstrap'

export default class StatusField extends React.Component {
  render () {
    return (
      <Alert bsStyle={this.props.stat}>
        {this.props.content}
        {this.props.stat === 'success'? <a href={this.props.href}>Return to login</a> : null}
      </Alert>
    )
  }
}
