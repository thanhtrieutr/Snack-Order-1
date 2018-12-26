import React, { Component } from 'react';
import Router from './routes/router';
import './helpers/bootstrap/off-set.css'
import './helpers/bootstrap/build-column.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router></Router>
        <ToastContainer></ToastContainer>
      </div>
    );
  }
}

export default App;
