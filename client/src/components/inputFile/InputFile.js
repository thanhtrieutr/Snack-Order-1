import React from 'react'
import { Form, FormControl } from 'react-bootstrap'
import './inputFile.css'

export default class InputFile extends React.Component {
  render() {
    return(
      <Form>
        <label className="product-input-label">
          <FormControl className="product-input-image" id={this.props.id} onChange={this.props.onChange} type="file"/>
          Choose an image
        </label>
      </Form>
    )
  }
}