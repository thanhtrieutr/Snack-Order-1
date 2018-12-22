import React, { Component } from "react"; 
import {API_ROOT} from '../../api-config'

class Images extends Component {
    render(){
        return (
            <div className={this.props.container}>
                <img className={this.props.class} src={API_ROOT + this.props.imgName} alt=""/>
            </div>
        );
    }
}

export default Images;