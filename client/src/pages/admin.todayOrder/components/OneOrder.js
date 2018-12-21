import React from 'react';

class OneOrder extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <tr>
                <td>{this.props.key}</td>
                <td>{this.props.name}</td>
                <td>{this.props.quantity}</td>
                <td>{this.displayPrice(this.props.price)}</td>
                <td>{this.displayPrice(this.props.totalPrice)}</td>
                <td>{this.props.user}</td>
                <td>{this.props.status}</td>
            </tr>
        );
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

export default OneOrder;