import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Container from './components/container/Container'

export default class ForgotPassword extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <div className="fp-home">
          <Container/>
        </div>
        <Footer/>
      </div>
    )
  }
}
