import React from 'react';

import AdminPostActions from '../admin/AdminPostActions.js'

import LoadingContainer from '../elements/LoadingContainer'
import Comments from './Comments'
import Post from './Post.js'
import Alerts from '../elements/Alerts.js'
import PostNavigation from '../elements/PostNavigation.js'

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
  }

  componentDidMount() {
    this.loadPost()
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.id !== prevProps.match.params.id) {
      this.loadPost()
    }
  }

  loadPost() {
    this.setState({loading: true})
    fetchPost(this.props.match.params.id)
    .then(result => this.setState({
      ...result.post,
      loading: false,
      next: result.next,
      prev: result.prev
    }))
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

  removeComment = () => {
      this.setState({
        commentCount: this.state.commentCount - 1
      })
  }

  addComment = (comment) => {
    this.setState({
      comments: [...this.state.comments, comment],
      commentCount: this.state.commentCount + 1
    })
  }

  render() {
    const post = this.state
    return (
      <LoadingContainer loading={this.state.loading}>
        <Post brief={false} post={post} removing={this.state.removing}>
          <AdminPostActions id={post.id} onDelete={this.removePost} />
        </Post>
        <PostNavigation next={this.state.next} prev={this.state.prev} />
        <Comments id={post.id} comments={post.comments}
          onDelete={this.removeComment}
          onAdd={this.addComment} />
        <Alerts alerts={this.state.alerts} />
      </LoadingContainer>
    )
  }
}

export default SinglePost;
