import React, { Component } from 'react';

import PostForm from './PostForm.js';
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

class NewPost extends Component {

  state = {
    submitted: false
  }

  onSubmit = (data) => {
    post(data).then((result) => {
      this.setState({ submitted: true })
    })
  }

  render() {
    return (
      <PostForm onSubmit={this.onSubmit}>
        <Button variant="primary" type="submit" disabled={this.state.submitted}>
          {this.state.submitted ? 'Post sent' : 'Submit' }
        </Button>
      </PostForm>
    )
  }
}

export default NewPost;
