import React from 'react'
import { Form, FormControl } from 'react-bootstrap'

export default class InputFile extends React.Component {
  render() {
    return(
      <Form>
        <FormControl id={this.props.id} type="file"></FormControl>
      </Form>
    )
  }
}