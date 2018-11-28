import React, { Component } from 'react';
import Menu from './Menu';

class TabField extends Component {
  render() {
    return (
      <div id="nav-menu" className="column is-2">
        <aside className="menu sticky">
          <Menu></Menu>
        </aside>
      </div>
    )
  }
}

export default TabField;