import React from 'react'
import { Col, Table } from 'react-bootstrap'
import { loadProduct } from '../../../helpers/api/adminApi/get-product.api'
import ProductDetail from './Modal'
import NavBarAdmin from '../../../components/NavBarAdmin/NavBarAdmin'
import Item from './Item';

export default class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      stateModal: false,
      products: [],
      item: {},
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  componentWillMount() {
    loadProduct((result) => {
      this.setState({
        products: result.products,
      });
    });
  }
  render() {
    return (
      <Col xs={10}>
      <NavBarAdmin activeMenuItem="home"></NavBarAdmin>
      <Table striped responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.createProduct(this.state.products)}</tbody>
        </Table>
        <ProductDetail editState={false} name={this.state.item.name} show={this.state.stateModal} onHide={this.hideModal} bsSize="large"
                      price={this.state.item.price} image={this.state.item.image} id={this.state.item.id}/>
      </Col>
    )
  }
  showModal() {
    this.setState({
      stateModal: true,
    })
  }
  hideModal() {
    this.setState({
      stateModal: false,
    })
  }
  createProduct(productList) {
    var listItem = productList.map((item, index) => {
      return <Item no={index+1} key={index} name={item.name} price={item.price} image={item.img} id={item._id}
                  getData={this.getData}/>
    })
    return listItem;
  }
  getData = (callbackItem) => {
    this.setState({ 
      item: callbackItem,
      stateModal: true,
    });
  }
}
