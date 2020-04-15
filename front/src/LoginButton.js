import React, { Component } from 'react';
import { AdminContext } from './admin/AdminContext'

import { LinkContainer } from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Logout = (props) => {
  return (
    <Container>
      <LinkContainer to="/new">
        <Button variant="success">New Post</Button>
      </LinkContainer>
      <Nav.Link onClick={props.onClick}>Logout ({props.name})</Nav.Link>
    </Container>
  )
}

const Login = () => {
  return (
    <LinkContainer to="/login">
      <Nav.Link>Login</Nav.Link>
    </LinkContainer>
  )
}

class LoginButton extends Component {

  render() {
    const ctx = this.context
    const isLoggedIn = ctx.user.name !== undefined
    return (
      <Nav className="ml-auto">
        <Nav.Item>
          { isLoggedIn ? <Logout onClick={ctx.logout} name={ctx.user.name}/> : <Login /> }
        </Nav.Item>
      </Nav>
    )
  }
}

LoginButton.contextType = AdminContext;

export default LoginButton;
