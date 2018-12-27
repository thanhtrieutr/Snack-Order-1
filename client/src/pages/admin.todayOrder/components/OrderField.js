import React from 'react';
import { Col, Table, ButtonToolbar, Button, Well } from 'react-bootstrap'
import OneOrder from "./OneOrder";
import getOrder from '../script/get-today-order';
import {submitStatus} from '../script/submit-status';
class OrderField extends React.Component {
    constructor() {
        super();
        this.state = {
            orderList: [],
            total: 0
        }
        this.createOrder = this.createOrder.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.statusHandle = this.statusHandle.bind(this);
    }
    componentWillMount() {
        getOrder((result) => {
            if (result !== false) {
                var total = 0;
                for (var i in result)
                    total += result[i].totalPrice;
                this.setState({
                    orderList: result,
                    total: total
                });
            }
        })
    }
    render() {
        return (
        <Col xs={12} md={9} lg={10}>
            <div className="table-responsive">
            <Table striped 
            // responsive 
            hover>
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
                <tr>
                <td colSpan="7"><Well >Total: {this.displayPrice(this.state.total)}</Well></td>
                </tr>
            </tbody>
            
        </Table>
        
        </div>
        <ButtonToolbar bsClass="admin-today-order-button-bar">
            <Button id="admin-today-order-button" onClick={this.submitChange}>Change</Button>
        </ButtonToolbar>
        
      </Col>
        );
    }
    createOrder() {
        //create order 
        var newOrder = this.state.orderList.map((item, index) => {
            return <OneOrder no={index} key={index} name={item.name} quantity={item.quantity} price={item.price}
            totalPrice={item.totalPrice} user={item.user} status={item.status} statusHandle={this.statusHandle}
            ></OneOrder>
        })
        return newOrder;
    }
    submitChange() {
        submitStatus(this.state.orderList, (result) => {
            if (result) 
                alert("Update success!");
            else alert("Update fail!");
        })
    }
    statusHandle(eventKey, event) {
        eventKey = eventKey.substring(0, eventKey.length-1);
        var newOrderList = this.state.orderList.map((item, index) => {
            if (index.toString() !== eventKey) {
                return item;
            }
            else {
                item.status = event.target.innerHTML;
                return item;
            }
        });
        this.setState({
            orderList: newOrderList
        })
    }
    displayPrice(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) {
            x = x.replace(pattern, "$1,$2");
        }
        return x + " đ";
    }
}

export default OrderField;