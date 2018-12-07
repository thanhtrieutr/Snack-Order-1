import React from 'react';

export default class Tab extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.href} id={this.props.id} className={this.props.className}>
          {this.props.content}
        </a>
      </li>
    )
  }
}

//<li><a href="/today-order" id="today-order" className="choice is-active">Today Order</a></li>