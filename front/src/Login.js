import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {
  render() {
    return (
      <Container>
        <Form className="p-4">
          <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
              Login
          </Button>
        </Form>
        <Link to="/newpost">new</Link>
      </Container>
    )
  }
}

export default LoginForm;
