import React from 'react';
import {getProductHistory} from '././scripts/loadHistoryData';
import HeaderTag from '././components/headerTag'
import HistoryContainer from '././components/historyContainer';
import LinkAdminPage from './../../components/LinkAdminPage/LinkAdminPage'
import NavBarAdmin from './../../components/NavBarAdmin/NavBarAdmin'
import '././index.scss'

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
      var data = this.state.orderHistory.reverse();
      this.setState({
        orderHistory: data
      })
    })
  }

  render() {
    return (
      <div className="admin-order-history">
          <HeaderTag/>
          <NavBarAdmin activeMenuItem="Order history"></NavBarAdmin>
				  <LinkAdminPage activeMenuItem="Order history"></LinkAdminPage>
          <HistoryContainer historyContainer={this.state.orderHistory}
          className="col-md-8"/>
      </div>
    )
  }
}

export default AdminOrderHistory;