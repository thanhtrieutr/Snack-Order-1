import React from 'react';
import StatusDropdown from './StatusDropdown';
class OneOrder extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>{this.props.name}</td>
                <td>{this.props.quantity}</td>
                <td>{this.displayPrice(this.props.price)}</td>
                <td>{this.displayPrice(this.props.totalPrice)}</td>
                <td>{this.props.user}</td>
                <td>
                    <StatusDropdown status={this.props.status} no={this.props.no}
                    statusHandle={this.props.statusHandle}></StatusDropdown>
                </td>
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