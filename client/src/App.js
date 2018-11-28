import React, { Component } from 'react';
import './App.css';
import Router from './routes/router';
import './helpers/bootstrap/off-set.css'
import './helpers/bootstrap/build-column.css'

class App extends Component {
  render() {
    return (
      <Router></Router>
    );
  }
}

export default App;
