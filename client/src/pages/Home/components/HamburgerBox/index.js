
import React, { Component } from 'react'
import Link from '../../../../components/Home/link'

export default class HamburgerBox extends Component {
    constructor() {
        super();
        this.UserProfile = this.UserProfile.bind(this);
        this.displayHandler = this.displayHandler.bind(this);
    }
    UserProfile() {
        this.props.history.push('/profile');
    }
    displayHandler(status) { 
        return (status ? <div className="hamburger-container">
                            <div className="blank-part" onClick={this.props.menuHandler}></div>
                            <div className="side-part cl-xs-8 cl-sm-6" id="hamburger-box">
                                <div className="selection-container">
                                    <Link redirect={this.UserProfile} class="hamburger-option cl-xs-12" content="Profile"></Link> 
                                    <Link redirect={this.props.logOutHandler} class="hamburger-option cl-xs-12" id="log-out-button-hamburger" content="Log Out"></Link> 
                                </div>
                            </div>
                        </div> : null);
    }
    render() {
        return(
            <div>
                {this.displayHandler(this.props.hamburgerStatus)}
            </div>
        )
    }
}

