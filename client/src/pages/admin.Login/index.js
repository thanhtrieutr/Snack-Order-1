import React from 'react';
import './styles.scss';
import HeadTag from './components/HeadTag';
import LogoField from './components/LogoField';
import LoginField from './components/LoginField';
import {checkToken} from '../../helpers/api/admin.api'

class AdminLogin extends React.Component {
  constructor() {
    super();
    var token = { token: localStorage.getItem("token")};
    checkToken(token, (result) => {
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
    // const result = this.callYoutube();
    return (
      <div className="Admin-login">
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