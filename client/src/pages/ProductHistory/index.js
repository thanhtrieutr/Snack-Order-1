import React from 'react';
import {getProductHistory} from '././scripts/loadHistoryData';
import HeaderTag from '././components/headerTag'
import HistoryContainer from '././components/historyContainer';

class AdminOrderHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      orderHistory: []
    }
  }
  
  componentWillMount() {
    getProductHistory(result => {
      this.setState({
        orderHistory: result
      })
    })
  }

  render() {
    return (
      <div className="admin-order-history">
          <HeaderTag/>
          <HistoryContainer historyContainer={this.state.orderHistory}/>
      </div>
    )
  }
}

export default AdminOrderHistory;