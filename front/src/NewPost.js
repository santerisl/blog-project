import React, { Component } from 'react';

import PostForm from './PostForm.js';

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

  onSubmit = (data) => {
    post(data).then((result) => {
      this.props.history.push(`/`)
    })
  }

  render() {
    return (
      <PostForm onSubmit={this.onSubmit} text='Submit' />
    )
  }
}

export default NewPost;