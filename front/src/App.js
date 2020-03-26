import React, {Component} from 'react';
import PostList from './PostList.js';
import Post from './Post.js';
import { Route, Link } from 'react-router-dom'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          <h1>Blog</h1>
        </header>
        <div className="AppContent">
          <Route exact={true} path="/" component={PostList} />
          <Route exact={true} path="/posts/:id" component={Post} />
        </div>
        <footer className="AppFooter">
          <p>helpDesk</p>
        </footer>
      </div>
    )
  }
}

export default App;
