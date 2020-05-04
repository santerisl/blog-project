import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
      console.log('submit', data)
    }
  }

  render() {
    return (
      <Row>
        <Col className="my-2">
          <Form onSubmit={this.handleSubmit}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Comment!</Card.Title>
                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="textarea" placeholder="Author name"
                    required maxLength="255" />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control as="textarea" rows="3" required />
                </Form.Group>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Button variant="primary" type="submit">Comment!</Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default CommentForm;
