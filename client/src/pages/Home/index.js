import React, { Component } from 'react'
import Title from './components/Title/index'
import Cart from './components/Cart/index'
import Products from './components/Products/index'
import HamburgerBox from './components/HamburgerBox/index'
import {checkLogIn} from './script/authenticate'
import '../../helpers/bootstrap/build-column.css'
import '../../helpers/bootstrap/off-set.css'
import {logOut} from './script/logout'
import {loadSnack} from '../../pages/Home/script/loadSnack'
import '../../components/Home/css/order.css'
import '../../components/Home/css/items.css'


export default class Home extends Component {
  constructor() {
		super();
		this.state = {
      windowHeight: undefined,
      windowWidth: undefined,
      user:"",
      hamburgerStatus: 0,
      productList: []
    }
    this.handleResize = this.handleResize.bind(this);
    this.logOutHandle = this.logOutHandle.bind(this);
    this.hamburgerHandler = this.hamburgerHandler.bind(this);
	}
  componentWillMount() {
		checkLogIn(this.props.history,result => {
			this.setState({
				user : result
      });
      loadSnack(result => {
        this.setState({
          productList : result
        });
      })
		});
  }
  handleResize = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      hamburgerStatus: 0
    });
  } 
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  logOutHandle() { 
    logOut(this.props.history, result => { 
      if (result == true) { 
        this.setState({
          user: ""
        })
      }
    })
  }
  hamburgerHandler() { 
    if (this.state.hamburgerStatus == 0) {
      this.setState({hamburgerStatus : 1});
    }
    else this.setState({hamburgerStatus : 0});
  }
  render() {
    return (
        <div className='home'>
          <Title history={this.props.history} user={this.state.user} buttonHandler={this.logOutHandle} hamburgerHandler={this.hamburgerHandler} windowWidth={this.state.windowWidth}></Title>
          <HamburgerBox history={this.props.history} logOutHandler={this.logOutHandle} hamburgerStatus={this.state.hamburgerStatus}></HamburgerBox>
          <div className="container">
            <div className="row">
              <Products productList={this.state.productList}></Products>
              <Cart></Cart>
            </div>
          </div>
        </div>
    )
  }
}