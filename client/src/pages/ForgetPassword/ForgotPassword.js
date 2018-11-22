import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Container from './components/container/Container';

//Todo: write API for check user account
//      write API for check code
//      write API for update password
//      fix some UI bug
//      rewrite ContentField component

class ForgotPassword extends Component {
  render () {
    return (
      <div>
        <Header></Header>
        <Container></Container>
        <Footer></Footer>
      </div>
    )
  }
}

export default ForgotPassword;