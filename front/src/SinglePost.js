import React from 'react';

import AdminPostActions from './admin/AdminPostActions.js'

import Post from './Post.js'

const fetchPost = async (id) => {
  const hr = await fetch(`/api/posts/${id}`)
  const data = await hr.json();

  if (data.error) {
    data.title = data.status
  }

  return data
}

class SinglePost extends React.Component {

  state = {
    loading: true,
    post: {}
  }

  componentDidMount() {
    fetchPost(this.props.match.params.id)
      .then(post => this.setState({ post: post, loading: false }))
  }

  removePost = (id) => {
    this.props.history.push('/')
  }

  render() {
    const post = this.state.post
    return (
      <Post brief={false} post={post}>
        <AdminPostActions id={post.id} onDelete={this.removePost} />
      </Post>
    )
  }
}

export default SinglePost;
