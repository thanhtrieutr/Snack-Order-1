import React from 'react'
import { Button } from 'react-bootstrap'

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      price: props.price,
      image: props.image,
      id: props.id,
    }
    this.returnValue = this.returnValue.bind(this);
  }
  render() {
    return (
      <tr>
        <td>
          {this.props.no}
        </td>
        <td>
          {this.props.name}
        </td>
        <td>
          {this.props.price}
        </td>
        <td>
          <Button bsStyle="link" onClick={this.returnValue}>Details</Button>
        </td>
      </tr>
    )
  }
  returnValue = () => {
    var item = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      id: this.state.id,
    }
    this.props.getData(item);
  }
} 