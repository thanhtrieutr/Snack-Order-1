import React, { Component } from "react"; 
import {API_ROOT} from '../../api-config'

class Images extends Component {
    render(){
        return (
            <img alt="imageAlt" className={this.props.class} src={API_ROOT + this.props.imgName} />
        );
    }
}

export default Images;