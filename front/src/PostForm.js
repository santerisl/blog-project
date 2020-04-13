import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

async function post(data) {
  const response = await fetch('/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response;
}

class PostForm extends Component {

  state = {
    submitted: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let el = event.target.elements
    let data = {
      title: el.title.value,
      brief: el.brief.value,
      author: el.author.value,
      content: el.content.value,
    }
    post(data).then((result) => {
      this.setState({submitted: true})
    })

  }

  render() {
    return (
      <Form className="p-4" onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" />
        </Form.Group>

        <Form.Group controlId="brief">
          <Form.Label>Brief</Form.Label>
          <Form.Control type="text" placeholder="Blog post title" />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="textarea" placeholder="Author name" />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={this.state.submitted}>
          {this.state.submitted ? 'Post sent' : 'Submit' }
        </Button>
      </Form>
    )
  }
}

export default PostForm;
