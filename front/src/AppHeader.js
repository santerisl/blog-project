import React, {Component} from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import LoginButton from './elements/LoginButton'

import Navbar from 'react-bootstrap/Navbar';
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
            <LoginButton />
          </Navbar>
        </Container>
      </div>
    )
  }
}

export default AppHeader;
