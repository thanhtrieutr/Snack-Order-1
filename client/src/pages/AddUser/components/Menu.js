import React, { Component } from 'react';

class Menu extends Component {
  render() {
    return (
      <ul className="menu-list">
        <li><a href="/today-order" id="today-order" className="choice is-active">Today Order</a></li>
        <ul>
          <a href="/order-history" id="order-history" className="choice">Order history</a>
          <li><p id="order-detail-label" className="menu-label">| Order history detail</p></li>
        </ul>
        <ul>
          <a href="/users" id="users" className="choice">Users</a>
          <li><p id="user-detail-label" className="menu-label">| User detail</p></li>
        </ul>
        <ul>
          <a href="/product" id="product" className="choice">Product list</a>
          <li><p id="product-detail-label" className="menu-label">| Product detail</p></li>
        </ul>
        <li><a href="/add-product" id="add-product" className="choice">Add new product</a></li>
        <li><a href="/add-user" id="add-user" className="choice">Create new user</a></li>
      </ul>
    )
  }
}

export default Menu;