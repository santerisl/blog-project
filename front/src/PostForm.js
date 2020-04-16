import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class PostForm extends Component {

  state = {
    valid: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(event.target.checkValidity()) {
      let el = event.target.elements
      let data = {
        title: el.title.value,
        brief: el.brief.value,
        author: el.author.value,
        content: el.content.value,
      }
      this.props.onSubmit(data)
    }
  }

  render() {
    const post = this.props.post || {}
    return (
      <Form className="p-4" onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" 
            defaultValue={post.title}
            required maxLength="255"
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="textarea" placeholder="Author name" 
            defaultValue={post.author}
            required maxLength="255"
          />
        </Form.Group>

        <Form.Group controlId="brief">
          <Form.Label>Brief</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Blog post brief" 
            defaultValue={post.brief}
            required maxLength="255"
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="9"
            defaultValue={post.content}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" >
          {this.props.text}
        </Button>

      </Form>
    )
  }
}

export default PostForm;
