import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import LoadingButton from './LoadingButton'


class CommentForm extends Component {

  state = {
    valid: false,
    loading: false,
    validated: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: false, validated: true })
    if (event.target.checkValidity()) {
      event.persist()
      this.setState({ loading: true })
      let el = event.target.elements
      let data = {
        author: el.author.value,
        content: el.content.value,
      }
      this.props.onSubmit(data, (success) => {
        if (success) {
          this.setState({ loading: false, validated: false })
          el.author.value = ''
          el.content.value = ''
        }
      })
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="textarea" placeholder="Author name"
            disabled={this.state.loading}
            required maxLength="255" />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="3" required
            disabled={this.state.loading} />
        </Form.Group>
        <LoadingButton variant="primary" type="submit" loading={this.state.loading}>Comment!</LoadingButton>
      </Form>
    )
  }
}

export default CommentForm;
