import React, { Component } from "react"; 

class Checkbox extends Component {
    constructor() { 
        super();
        this.checkboxHandler = this.checkboxHandler.bind(this);
    }
    checkboxHandler() {
        this.props.checkboxHandler(this.props.index-1);
    }
    render(){
        return (
            <input className="checkbox-button" data-id={this.props.dataId} type="checkbox" id={"checkbox-" + this.props.index} onClick={this.checkboxHandler}></input>
        );
    }
}

export default Checkbox;