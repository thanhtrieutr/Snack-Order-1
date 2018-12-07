import React from 'react';
import './styles.scss';
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
    debugger
    const result = this.callYoutube();
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

  async callYoutube() {
    debugger
    try {
      const result = await fetch('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo');
      console.log(result);
    } catch (er) {
      debugger
      console.log(er);
    }
  }
}

export default AdminLogin;