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
import '../../components/Home/css/billstyle.scss'
import {displayPrice} from './script/displayPrice'
import {submitCart} from './script/submitCart'
import Helmet from 'react-helmet'

export default class Home extends Component {
  constructor() {
		super();
		this.state = {
      total: 0,
      windowHeight: undefined,
      windowWidth: undefined,
      user:"",
      hamburgerStatus: 0,
      productList: [],
      checkboxList: [],
      cart: [],
      amountList: [],
      cartStatus: 0,
    }
    this.handleResize = this.handleResize.bind(this);
    this.logOutHandle = this.logOutHandle.bind(this);
    this.hamburgerHandler = this.hamburgerHandler.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.amountHandler = this.amountHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.cartDisplay = this.cartDisplay.bind(this);
    this.cartHandler = this.cartHandler.bind(this);
    this.menuHandler = this.menuHandler.bind(this);
	}
  componentWillMount() {
    checkLogIn(this.props.history,result => {
        this.setState({
            user : result
      });
      loadSnack(result => {
        var checkboxListTemp= [];
        for (var i=0; i<result.length; i++) { 
            checkboxListTemp.push(0);
        }
        this.setState({
          productList : result,
          checkboxList: checkboxListTemp
        });
      })
    });
  }
  handleResize = () => {
    var status = this.state.hamburgerStatus;
    if (status === 1 && window.innerWidth < 768) {
      status = 1;
    }
    else status = 0;
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      hamburgerStatus: status,
      cartStatus: status
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
      if (result === true) { 
        this.setState({
          user: ""
        })
      }
    })
  }
  hamburgerHandler() { 
    if (this.state.hamburgerStatus === 0) {
      this.setState({hamburgerStatus : 1});
    }
    else this.setState({hamburgerStatus : 0});
  }
  cartHandler() { 
    if (this.state.cartStatus === 0) {
      this.setState({cartStatus : 1});
    }
    else this.setState({cartStatus : 0});
  }
  handleCheckbox(index) { 
    var tempList = this.state.checkboxList;
    var tempCart = this.state.cart;
    var tempAmountList = this.state.amountList;
    if (tempList[index]) {
        var position = tempCart.indexOf(index);
        tempCart[position] = -1;
        tempAmountList[position] = 0;
        tempList[index] = 0;
    }
    else {
        tempList[index] = 1;
        tempCart.push(index);
        tempAmountList.push(1);
    }
    this.setState({
        checkboxList: tempList,
        cart: tempCart,
        amountList: tempAmountList
    });
    this.calculateTotal();
  }
  amountHandler(status, index) {
    var tempList = this.state.amountList;
    //+
    if (status) { 
      if (tempList[index] < 99) { 
        tempList[index]++;
        this.setState({amountList: tempList});
      }
    }
    //-
    else {
      if (tempList[index] > 1) { 
        tempList[index]--;
        this.setState({amountList: tempList});
      }
    }
    this.calculateTotal();
  }
  calculateTotal() { 
    var amountList = this.state.amountList;
    var cartList = this.state.cart;
    var productList = this.state.productList;
    var totalPrice = 0;
    for (var i=0; i<cartList.length; i++) { 
      if (cartList[i] !== -1) {
        totalPrice += amountList[i] * productList[cartList[i]].price;
      }
    }
    this.setState({total: totalPrice});
  }
  submitHandler() { 
    var cartArray = [];
    var cartList = this.state.cart;
    var amountList = this.state.amountList;
    var productList = this.state.productList;
    for (var i = 0; i < cartList.length; ++i) { 
      if (cartList[i] !== -1) { 
        var obj = {};
        obj.amount = amountList[i];
        obj.productID = cartList[i] + 1;
        obj.productTrueID = productList[cartList[i]]._id.toString();
      }
      cartArray.push(obj);
    }
    submitCart(cartArray);
  }
  menuHandler() { 
    if (this.state.hamburgerStatus == 1) { 
      this.setState({hamburgerStatus : 0});
    }
  }
  cartDisplay(width) { 
    if (width >= 768) { 
      return (<Cart submitCart={this.submitHandler} totalPrice={displayPrice(this.state.total)} cartList={this.state.cart} productList={this.state.productList} amountList={this.state.amountList} amountHandler={this.amountHandler}></Cart>);
    }
    else {
      if (this.state.cartStatus === 1) { 
        return (<Cart submitCart={this.submitHandler} totalPrice={displayPrice(this.state.total)} cartList={this.state.cart} productList={this.state.productList} amountList={this.state.amountList} amountHandler={this.amountHandler}></Cart>); 
      }
    }
    return(null);
  }
  render() {
    return (
        <div className='home'>
          <Helmet>
            <title>Main Order</title>
          </Helmet>
          <Title cartHandler={this.cartHandler} history={this.props.history} user={this.state.user} buttonHandler={this.logOutHandle} hamburgerHandler={this.hamburgerHandler} windowWidth={this.state.windowWidth}></Title>
          <HamburgerBox menuHandler={this.menuHandler} history={this.props.history} logOutHandler={this.logOutHandle} hamburgerStatus={this.state.hamburgerStatus}></HamburgerBox>
          <div className="container">
            <div className="row">
              <Products productList={this.state.productList} checkboxHandler={this.handleCheckbox}></Products>
              {this.cartDisplay(this.state.windowWidth)}
            </div>
          </div>
        </div>
    )
  }
}