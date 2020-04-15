import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'


import Container from 'react-bootstrap/Container';

import AdminRoute from './admin/AdminRoute.js';
import AppHeader from './AppHeader.js';
import PostList from './PostList.js';
import SinglePost from './SinglePost.js';
import NewPost from './NewPost.js';
import ModifyPost from './ModifyPost.js';
import LoginForm from './Login.js';

import { AdminContext } from './admin/AdminContext';

import './App.css'


class App extends Component {

  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)

    let data = localStorage.getItem('user')
    if (data !== null) {
      this.state = { user: JSON.parse(data) }
    } else {
      this.state = { user: {} }
    }
  }

  logout() {
    this.setState({ user: {} });
    localStorage.removeItem('user');
  }

  login(username, password, result) {
    // Super secure user authentication!
    if (username === 'admin' && password === 'admin') {
      let user = { name: username, password: password }
      this.setState({ user: user });
      localStorage.setItem('user', JSON.stringify(user));
      result(true)
    } else {
      result(false)
    }
  }

  render() {
    const value = {
      user: this.state.user,
      logout: this.logout,
      login: this.login
    }
    return (
      <AdminContext.Provider value={value}>
        <AppHeader />
        <Container className="mt-2">
          <Switch>
            <Route exact={true} path="/" component={PostList} />
            <Route exact={true} path="/posts/:id" component={SinglePost} />
            <Route exact={true} path="/login" component={LoginForm} />
            
            <AdminRoute exact={true} path="/modify/:id" component={ModifyPost} />
            <AdminRoute exact={true} path="/new" component={NewPost} />

            <Route component={() => "404"} />
          </Switch>
        </Container>
      </AdminContext.Provider>
    )
  }
}

export default App;
