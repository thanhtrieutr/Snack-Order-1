import React, { Component } from 'react';
import Avatar from './Avatar';

class Header extends Component {
  render() {
    return (
      <div className="field">
        <nav className="navbar sticky" role="navigation" aria-label="main navigation">
          <div className="navbar-end">
            <div className="media">
              <div id="navbar-burger" className="navbar-burger burger" data-target="nav-menu">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="media-content">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <span className="title is-5" id="admin-name">Admin</span>
                        <span className="icon is-small" id="icon-dropdown">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                          <p> Log Out</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Avatar></Avatar>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header;