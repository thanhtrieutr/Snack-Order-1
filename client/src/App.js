import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/index'
import AdminLogin from './pages/adminLogin/index';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin-login' component={AdminLogin}/>
      </Switch>
    );
  }
}

export default App;
