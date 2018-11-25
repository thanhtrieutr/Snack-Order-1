import React from 'react';
import './styles.css';
import '../../helpers/css/responsive-design/off-set.css'
import '../../helpers/css/responsive-design/build-column.css'
import HeadTag from './components/HeadTag';
import LogoField from './components/LogoField';
import LoginField from './components/LoginField';
import AdminApi from '../../helpers/api/admin.api'

class AdminLogin extends React.Component {
  constructor() {
    super()
    var token = { token: localStorage.getItem("token")};
    AdminApi.checkToken(token, (result) => {
      if (result !== false) {
        alert("You have already logged in");
        window.location.href = "/admin";
      }
    })
  }
  componentDidMount() {
    // getAllUsersAPI().then(response => this.setState({ users: response.data })); 
  }
  render() {
    return (
      <div>
        <HeadTag></HeadTag>
        
        <div className="main-content">
          <LogoField></LogoField>
          <LoginField></LoginField>
        </div>
      </div>
    )
  }
}

export default AdminLogin;