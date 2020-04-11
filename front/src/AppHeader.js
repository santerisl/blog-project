import React, {Component} from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

class AppHeader extends Component {
  render() {
    return (
      <div className="bg-dark">
        <Container>
          <Navbar bg="dark" variant="dark">
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <h1>helpDesk Blog</h1>
            </Navbar.Brand>
          </LinkContainer>
            <Nav className="ml-auto">
              <Nav.Item>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Container>
      </div>
    )
  }
}

export default AppHeader;
