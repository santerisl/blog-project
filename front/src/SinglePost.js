import React from 'react';

import AdminPostActions from './admin/AdminPostActions.js'

import LoadingContainer from './LoadingContainer'
import Comments from './Comments'
import Post from './Post.js'
import Alerts from './Alerts.js'

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
    alerts: [],
    post: {},
  }

  componentDidMount() {
    fetchPost(this.props.match.params.id)
      .then(post => this.setState({ post: post, loading: false }))
  }

  removePost = (id, ok) => {
    if(ok) {
      this.props.history.push({
        pathname: '/',
        state: {
          alert: {
            variant: 'danger',
            text: 'Removed post'
          }
        }
      })
    } else {
      this.setState({
        alerts: [
          ...this.state.alerts, { variant: 'danger', text: 'Failed to remove post' }]
      })
    }
  }

  render() {

    const post = this.state.post
    return (
      <LoadingContainer loading={this.state.loading}>
        <Post brief={false} post={post} removing={this.state.removing}>
          <AdminPostActions id={post.id} onDelete={this.removePost} />
        </Post>
        {post.id !== undefined ? <Comments id={post.id} /> : null}
        <Alerts alerts={this.state.alerts} />
      </LoadingContainer>
    )

  }
}

export default SinglePost;
