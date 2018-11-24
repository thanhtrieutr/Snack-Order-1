import React, { Component } from "react"; 
import Image from "./image";
import Name from './name';

class NavigationChoose extends Component {
    render(){
        return (
            <li className={this.props.class} onClick={this.props.redirect}>
                {this.props.name}
            </li>
        );
    }
}

export default NavigationChoose;