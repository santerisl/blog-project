import React, {Component} from 'react';
import Posts from './Posts.js';

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          <h1>Blog</h1>
        </header>
        <div className="AppContent">
          <Posts />
        </div>
        <footer className="AppFooter">
          <p>helpDesk</p>
        </footer>
      </div>
    )
  }
}

export default App;
