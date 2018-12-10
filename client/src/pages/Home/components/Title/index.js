import React, { Component } from 'react'
import Hamburger from './Hamburger/index'
import Logo from './Logo/index'
import UserBar from './UserBar/index'
import CartButton from './CartButton/index'

export default class Title extends Component {
  constructor() {
    super();
    this.hamburgerHandler = this.hamburgerHandler.bind(this);
    this.userBarHandler = this.userBarHandler.bind(this);
  }
  hamburgerHandler(width) { 
    return(width < 768 ? <Hamburger hamburgerHandler={this.props.hamburgerHandler}></Hamburger> : null);
  }
  userBarHandler(width) { 
    return(width >= 768 ? <UserBar history={this.props.history} user={this.props.user} buttonHandler={this.props.buttonHandler}></UserBar>: null);
  }
  render() {
    return (
      <div>
        <div className='title'>
          {this.hamburgerHandler(this.props.windowWidth)}
          <div className="cl-xs-8 offset-md-4 cl-md-4">
            <Logo></Logo>
          </div>
          {this.userBarHandler(this.props.windowWidth)}
          
          {/* <div className="mobile">
            <CartButton></CartButton>
          </div> */}
        </div>
      </div>
    )
  }
}
