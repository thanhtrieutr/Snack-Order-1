import React from 'react';
import { Col, Table, ButtonToolbar, Button } from 'react-bootstrap'
import NavBarAdmin from '../../../components/NavBarAdmin/NavBarAdmin'
import OneOrder from "./OneOrder";
import getOrder from '../script/get-today-order';
class OrderField extends React.Component {
    constructor() {
        super();
        this.state = {
            orderList: []
        }
        this.createOrder = this.createOrder.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }
    componentWillMount() {
        getOrder((result) => {
            if (result !== false) {
                console.log(result);
                this.setState({
                    orderList: result
                });
            }
        })
    }
    render() {
        return (
        <Col xs={12} md={9} lg={10}>
            <NavBarAdmin activeMenuItem="today-order"></NavBarAdmin>
            <Table striped responsive hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Buyer</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {this.createOrder()}
            </tbody>
        </Table>
        <ButtonToolbar bsClass="admin-today-order-button-bar">
            <Button id="admin-today-order-button" onClick={this.submitChange()}>Change</Button>
        </ButtonToolbar>
      </Col>
        );
    }
    createOrder() {
        var newOrder = this.state.orderList.map((item, index) => {
            return <OneOrder key={index} name={item.name} quantity={item.quantity} price={item.price}
            totalPrice={item.totalPrice} user={item.user} status={item.status}
            ></OneOrder>
        })
        return newOrder;
    }
    submitChange() {

    }
}

export default OrderField;