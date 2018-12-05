import React, { Component } from "react"; 

class InfoBar extends Component {
    constructor(props) {
		super(props)
		this.state = {
			value: props.value
		}
		this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    onChangeHandler(event) {
        this.props.getValue(event.target.value);
		this.setState({ value: event.target.value });
    }
    componentWillReceiveProps(nextProps) {
		this.setState ({
			value: nextProps.value
		})
    }
    render(){
        return (
            <div className="info-bar">
                <label className="property cl-xs-12 cl-sm-4 cl-md-5">{this.props.name} </label>
                <input placeholder={this.props.placeHolder} id={this.props.id} onChange={this.onChangeHandler} className="cl-xs-12 cl-sm-7 cl-md-6 input-field" value={this.state.value} type="password"/> 
            </div>
        );
    }
}

export default InfoBar;