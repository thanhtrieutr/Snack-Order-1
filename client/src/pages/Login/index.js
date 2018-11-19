import React from 'react';
import './styles.css';
import Input from './components/input'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    // getAllUsersAPI().then(response => this.setState({ users: response.data })); 
  }
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

export default Login;