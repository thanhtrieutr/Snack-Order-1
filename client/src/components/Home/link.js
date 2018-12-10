import React, { Component } from "react"; 

class Link extends Component {
    render(){
        return (
            <a onClick={this.props.redirect} className={this.props.class} id={this.props.id}>
                <div>
                    {this.props.content}
                </div>
            </a>
        );
    }
}

export default Link;

