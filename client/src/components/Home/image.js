import React, { Component } from "react"; 

class Images extends Component {
    render(){
        return (
            <img alt="imageAlt" className={this.props.class} src={'http://127.0.0.1:3000'+ this.props.imgName} />
        );
    }
}

export default Images;