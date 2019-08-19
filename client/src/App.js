import React, { Component } from 'react';

import './css_app/normalise.css';
import '../node_modules/bulma/css/bulma.min.css';
import './css_app/App.scss';

import Interests from './components/interests';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <div id="header-title">    </div>
          <div id="header-navigate"> </div>
          <div id="header-more">   </div>
        </header>

        <div className="App-main">
          <Interests mountErrorTo={ this.mountErrorTo }/>
        </div>
      </div>
    );
  }
}

export default App;
