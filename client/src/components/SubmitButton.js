import React from 'react';

class SubmitButton extends React.Component {
    render() {
        return (
            <button type="submit" id={this.props.id} onClick={this.props.onClickHandle}
            className={this.props.className}> {this.props.content} </button>
        );
    }
}

export default SubmitButton;