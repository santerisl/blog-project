import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

import Container from 'react-bootstrap/Container';

import AppHeader from './AppHeader.js';
import PostList from './PostList.js';
import Post from './Post.js';
import LoginForm from './Login.js';
import PostForm from './PostForm.js';

import './App.css'


class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <Container className="mt-2">
          <Switch>
            <Route exact={true} path="/" component={PostList} />
            <Route exact={true} path="/posts/:id" component={Post} />
            <Route exact={true} path="/login" component={LoginForm} />
            <Route exact={true} path="/newpost" component={PostForm} />
            <Route component={() => "404"} />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default App;
