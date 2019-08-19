import React, { Component } from 'react';
import './css_app/App.scss';

class Error_msg extends Component {

  render() {
    return (
      <div className="app-error-msg"> <p> { this.props.error.msg } . please refresh your browser </p> </div>
    );
  }
}

export default Error_msg;
