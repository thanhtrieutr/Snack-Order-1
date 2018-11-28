import React, { Component } from "react"; 

class ButtonClick extends Component {
    render(){
        return (
            <button className="cl-xs-12 offset-sm-1 cl-sm-4 offset-md-1 cl-md-4" onClick={this.props.buttonHandler}> {this.props.name} </button>
        );
    }
}

export default ButtonClick;