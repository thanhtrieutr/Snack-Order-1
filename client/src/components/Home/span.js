import React, { Component } from "react"; 

class Span extends Component {
    render(){
        return (
            <span className={this.props.class} id={this.props.id}> {this.props.content} </span>
        );
    }
}

export default Span;