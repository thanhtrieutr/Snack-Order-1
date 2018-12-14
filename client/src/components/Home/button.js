import React, { Component } from "react"; 

class ButtonClick extends Component {
    render(){
        return (
            <button id={this.props.id} className={this.props.className} onClick={this.props.buttonHandler}> {this.props.content} </button>
        );
    }
}

export default ButtonClick;