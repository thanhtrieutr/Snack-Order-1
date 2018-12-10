import React, { Component } from "react"; 

class Name extends Component {
    render(){
        return (
            <div className={this.props.class} id={this.props.id}>{this.props.name}</div>
        );
    }
}

export default Name;