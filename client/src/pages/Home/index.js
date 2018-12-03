import React, { Component } from 'react'
import Title from '../../components/Title/index'
import Cart from '../../components/Cart/index'
import Products from '../../components/Products/index'
import './home.styles.css'

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <div className="upper-part">
          <Title></Title>
        </div>
        <div className="lower-part">
          <div className="left">
            <Products></Products>
          </div>
          <div className="right">
            <Cart></Cart>
          </div>
        </div>
      </div>
    )
  }
}