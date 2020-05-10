import React, { Component } from 'react';

import PostForm from '../forms/PostForm.js';

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
    post(data).then((response) => {
      if(response.ok) {
        const location = response.headers.get('Location')
        const id = location.split('/').pop()
        this.props.history.push(`/posts/${id}`)
      }
    })
  }

  render() {
    return (
      <PostForm onSubmit={this.onSubmit} text='Submit' />
    )
  }
}

export default NewPost;
