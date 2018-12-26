import React from 'react'
import { Col, Table } from 'react-bootstrap'
import { loadProduct } from '../../../helpers/api/adminApi/get-product.api'
import LinkAdminPage from "../../../components/LinkAdminPage/LinkAdminPage"
import NavBarAdmin from '../../../components/NavBarAdmin/NavBarAdmin'
import Item from './Item'

export default class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      item: {},
    }
    this.updateInfo = this.updateInfo.bind(this);
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
      <div>
        <NavBarAdmin activeMenuItem="products"></NavBarAdmin>
        <LinkAdminPage activeMenuItem="products"></LinkAdminPage>
        <Col xs={12} md={9} lg={10}>
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
        </Col>
      </div> 
    )
  }
  createProduct(productList) {
    var listItem = productList.map((item, index) => {
      return <Item no={index+1} key={index} name={item.name} price={item.price} image={item.img} id={item._id}
                  getData={this.getData} updateInfo={this.updateInfo}/>
    })
    return listItem;
  }
  updateInfo() {
    this.componentWillMount();
  }
}
