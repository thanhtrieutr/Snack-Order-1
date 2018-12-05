import React, { Component } from "react"; 

class ButtonClick extends Component {
    render(){
        return (
            <button className={this.props.class} onClick={this.props.buttonHandler}> {this.props.name} </button>
        );
    }
}

export default ButtonClick;