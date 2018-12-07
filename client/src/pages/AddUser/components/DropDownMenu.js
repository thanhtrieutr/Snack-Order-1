import React, { Component } from 'react';

class DropDownMenu extends Component {
  render() {
    return (
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content">
            <div class="dropdown-item">
                <p onclick="logoutAdmin()">Log Out</p>
            </div>
        </div>
    </div>
    )
  }
}

export default DropDownMenu;