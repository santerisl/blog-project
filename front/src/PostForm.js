import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';

class PostForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    let el = event.target.elements
    let data = {
      title: el.title.value,
      brief: el.brief.value,
      author: el.author.value,
      content: el.content.value,
    }
    this.props.onSubmit(data)
  }

  render() {
    const post = this.props.post || {}
    return (
      <Form className="p-4" onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" defaultValue={post.title} />
        </Form.Group>

        <Form.Group controlId="brief">
          <Form.Label>Brief</Form.Label>
          <Form.Control type="text" placeholder="Blog post brief" defaultValue={post.brief}/>
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="textarea" placeholder="Author name"  defaultValue={post.author}/>
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="3" defaultValue={post.content} />
        </Form.Group>

        {this.props.children}

      </Form>
    )
  }
}

export default PostForm;
