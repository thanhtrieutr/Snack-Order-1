import React, { Component } from "react"; 

class Checkbox extends Component {
    render(){
        return (
            <input className="checkbox-button" data-id={this.props.dataId} type="checkbox" id={"checkbox-" + this.props.index} onClick={this.props.checkboxHandler}></input>
        );
    }
}

export default Checkbox;