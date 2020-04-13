import React, {Component} from 'react';

import { AdminContext } from './admin/AdminContext'


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class LoginForm extends Component {

  state = {failed: false}

  errorText = 'Login failed! (Try again with username: admin, password: admin)'

  handleSubmit = (event) => {
    event.preventDefault()
    let el = event.target.elements
    let username = el.username.value
    let password = el.password.value

    this.context.login(username, password, (result) => {
      if(result) {
        this.props.history.push('/')
      } else {
        this.setState({failed: true})
      }
    })
  }

  render() {
    return (
      <Container>
        <Form className="p-4" onSubmit={this.handleSubmit}>
          { this.state.failed ? <Alert variant="danger">{this.errorText}</Alert> : null }

          <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
              Login
          </Button>

        </Form>
      </Container>
    )
  }
}

LoginForm.contextType = AdminContext;

export default LoginForm;
