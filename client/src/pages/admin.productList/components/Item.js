import React from 'react'
import { Button } from 'react-bootstrap'
import { getOneProduct } from '../../../helpers/api/adminApi/upload-image.api'
import ProductDetail from './Modal'
export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateModal: false,
      name: null,
      price: null,
      image: null,
      id: null,
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
  }
  render() {
    return (
      <tr className="admin-justified-content">
        <td>
          <div>{this.props.no}</div>
        </td>
        <td>
          <div>{this.props.name}</div>
        </td>
        <td>
          <div>{this.props.price} vnđ</div>
        </td>
        <td>
          <Button bsStyle="link" onClick={this.showModal}>Details</Button>
        </td>
        <ProductDetail bsSize="large" show={this.state.stateModal} onHide={this.closeModal} name={this.state.name} price={this.state.price}
          image={this.state.image} id={this.state.id} changeInfo={this.changeInfo}/>
      </tr>
    )
  }
  showModal() {
    getOneProduct(this.props.id, (result) => {
      if (result.success === true) {
        this.setState({
          stateModal: true,
          name: result.product.name,
          price: result.product.price,
          image: result.product.img,
          id: result.product._id,
        })
      }
    })
  }
  closeModal() {
    this.setState({
      stateModal: false,
    }, () => {
      this.props.updateInfo();
    })
  }
  changeInfo() {
    this.showModal();
  }
} 
