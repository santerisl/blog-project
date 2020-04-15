import React, { Component } from 'react';

import PostForm from './PostForm.js';
import Button from 'react-bootstrap/Button';

const fetchPost = async (id) => {
  const hr = await fetch(`/api/posts/${id}`)
  const data = await hr.json();

  if (data.error) {
    data.title = data.status
  }

  return data
}

async function modify(data, id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response;
}

class ModifyPost extends Component {

  state = {
    post: {}
  }

  componentDidMount() {
    fetchPost(this.props.match.params.id)
      .then(post => this.setState({ post: post }))
    }

  onSubmit = (data) => {
    modify(data, this.state.post.id).then((result) => {
      this.props.history.push(`/posts/${this.state.post.id}`)
    })
  }

  render() {
    return (
      <PostForm onSubmit={this.onSubmit} post={this.state.post}>
        <Button variant="primary" type="submit">Save Changes</Button>
      </PostForm>
    )
  }
}

export default ModifyPost;
