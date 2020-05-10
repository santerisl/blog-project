import React, { Component } from 'react';

import LoadingContainer from '../elements/LoadingContainer.js';
import PostForm from '../forms/PostForm.js';

const fetchPost = async (id) => {
  const hr = await fetch(`/api/posts/single/${id}`)
  const data = await hr.json();

  if (data.error) {
    data.title = data.status
  }

  return data
}

async function modify(data, id) {
  const response = await fetch(`/api/posts/single/${id}`, {
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
    post: {},
    loading: true
  }

  componentDidMount() {
    fetchPost(this.props.match.params.id)
      .then(post => this.setState({
        post: post,
        loading: false
      }))
  }

  onSubmit = (data) => {
    modify(data, this.state.post.id).then((result) => {
      this.props.history.push(`/posts/${this.state.post.id}`)
    })
  }

  render() {
    return (
      <LoadingContainer loading={this.state.loading}>
        <PostForm onSubmit={this.onSubmit} post={this.state.post} text='Save changes' />
      </LoadingContainer>
    )
  }
}

export default ModifyPost;
