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
                <label className="property cl-xs-12 cl-sm-4 cl-md-3">{this.props.name} </label>
                <div className="cl-xs-12 cl-sm-8 cl-md-8">
                    <input type="password" id={this.props.id} onChange={this.onChangeHandler} className="cl-xs-12 cl-sm-9 cl-md-10 input-field" value={this.state.value}/>
                </div>
            </div>
        );
    }
}

export default InfoBar;