import React from 'react';
import {getProductHistory} from '././scripts/loadHistoryData';
// import AdminApi from '../../helpers/api/admin.api'
import HeaderTag from '././components/headerTag'
import HistoryContainer from '././components/historyContainer';
import LinkAdminPage from './../../components/LinkAdminPage/LinkAdminPage'
import NavBarAdmin from './../../components/NavBarAdmin/NavBarAdmin'
import '././index.scss'

class AdminOrderHistory extends React.Component {
  constructor() {
    super();
    // var token = { token: localStorage.getItem("token")};
    // AdminApi.checkToken(token, (result) => {
    //   if (result !== false) {
    //     alert("You haven't logged in");
    //     window.location.href = "/admin/login";
    //   }
    // })
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