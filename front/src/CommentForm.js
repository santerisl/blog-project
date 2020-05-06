import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class CommentForm extends Component {

  state = {
    valid: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (event.target.checkValidity()) {
      let el = event.target.elements
      let data = {
        author: el.author.value,
        content: el.content.value,
      }
      this.props.onSubmit(data)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="textarea" placeholder="Author name"
            required maxLength="255" />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="3" required />
        </Form.Group>
        <Button variant="primary" type="submit">Comment!</Button>
      </Form>
    )
  }
}

export default CommentForm;
