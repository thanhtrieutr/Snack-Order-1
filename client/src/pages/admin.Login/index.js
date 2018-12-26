import React from 'react';
import './styles.scss';
import HeadTag from './components/HeadTag';
import LogoField from './components/LogoField';
import LoginField from './components/LoginField';
import {checkToken} from '../../helpers/api/adminApi/check-token'
import { withRouter } from "react-router"; 

class AdminLogin extends React.Component {
  constructor() {
    super();
    var token = { token: localStorage.getItem("token")};
    checkToken(token, (result) => {
      if (result !== false) {
        alert("You have already logged in");
        this.props.history.push('/admin');
      }
    })
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

export default withRouter(AdminLogin);