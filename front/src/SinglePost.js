import React from 'react';

import AdminPostActions from './admin/AdminPostActions.js'

import Comments from './Comments'
import Post from './Post.js'

import Container from 'react-bootstrap/Container';


const fetchPost = async (id) => {
  const hr = await fetch(`/api/posts/${id}`)
  const data = await hr.json();

  if (data.error) {
    data.title = data.status
  }

  return data
}

const comments = [
  {
    id: 1,
    author: 'Comment Author',
    content: 'Comment content Commodo enim deserunt excepteur consectetur aliqua officia duis.',
    date: Date.now()
  },
  {
    id: 2,
    author: 'Comment Author',
    content: 'Comment content Commodo enim deserunt excepteur consectetur aliqua officia duis.',
    date: Date.now()
  },
  {
    id: 3,
    author: 'Comment Author',
    content: 'Comment content Commodo enim deserunt excepteur consectetur aliqua officia duis.',
    date: Date.now()
  }
]

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
    this.props.history.push({
      pathname: '/',
      state: { alert: {
        variant: 'danger',
        text: 'Removed post'
      }}
    })
  }

  render() {
    const post = this.state.post
    post.comments = comments;
    return (
      <Container>
        <Post brief={false} post={post}>
          <AdminPostActions id={post.id} onDelete={this.removePost} />
        </Post>
        <Comments comments={post.comments} />
      </Container>
    )
  }
}

export default SinglePost;
