import React from 'react';
import './styles.scss';
import HeadTag from './components/HeadTag';
import LogoField from './components/LogoField';
import LoginField from './components/LoginField';
import {checkToken} from '../../helpers/api/userApi/check-token.api';

class UserLogin extends React.Component {
  constructor() {
    super();
    checkToken((result) => {
      if (result === true) {
        alert("You have already logged in");
        window.location.href = "/";
      }
    })
  }
  componentDidMount() {
    // getAllUsersAPI().then(response => this.setState({ users: response.data })); 
  }
  render() {
    return (
      <div className="user-login">
        <HeadTag></HeadTag>
        
        <div className="main-content">
          <LogoField></LogoField>
          <LoginField></LoginField>
        </div>
      </div>
    )
  }
}

export default UserLogin;