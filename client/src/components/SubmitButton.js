import React from 'react';

class SubmitButton extends React.Component {
    constructor() {
        super();
        this._onClickHandle = this._onClickHandle.bind(this);
    }
    render() {
        return (
            <button type="submit" id={this.props.id} onClick={this.props.onClickHandle}
            className={this.props.className}> {this.props.content} </button>
        );
    }
    _onClickHandle(event) {
        event.preventDefault();
        this.props.onClickHandle();
    }
}

export default SubmitButton;