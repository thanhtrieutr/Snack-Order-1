import React from 'react'
import { Col, Table } from 'react-bootstrap'
import { loadProduct } from '../../../helpers/api/adminApi/get-product.api'
import ReactPaginate from 'react-paginate'
import Item from './Item'
// import PerPage from './PerPage'

export default class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: '1',
      totalPages: '',
      perPage: '12',
      products: [],
      item: {},
    }
    this.updateInfo = this.updateInfo.bind(this);
    this.changePage = this.changePage.bind(this);
    this.statusHandle = this.statusHandle.bind(this);
  }
  componentWillMount() {
    loadProduct(this.state.currentPage, this.state.perPage, (result) => {
      this.setState({
        products: result.products,
        totalPages: result.totalPages,
      });
    });
  }
  render() {
    return (
      <Col xs={12} md={9} lg={10}>
        <Table striped responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.createProduct(this.state.products)}</tbody>
        </Table>

        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={parseInt(this.state.totalPages)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={3}
                       onPageChange={this.changePage}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        {/* <PerPage perPage={this.state.perPage} statusHandle={this.statusHandle}/> */}
      </Col>
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
  changePage(evt) {
    this.setState({
      currentPage: evt.selected + 1,
    }, () => {
      this.componentWillMount();
    })
  }
  statusHandle(evt) {
    debugger
    this.setState({
      perPage: evt.target.text
    })
  }
}
