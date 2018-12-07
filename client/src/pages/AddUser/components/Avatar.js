import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    return (
      <div className="media-left">
        <figure className="image is-48x48">
          <img alt="avatar" src="static/images/default-avatar.png"/>
        </figure>
      </div>
    )
  }
}

export default Avatar;