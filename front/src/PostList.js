import React from 'react';

import AdminPostActions from './admin/AdminPostActions.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Alerts from './Alerts.js'
import Post from './Post.js'

const fetchPosts = async () => {
  const hr = await fetch('/api/posts/')
  const data = await hr.json();
  return data
}

class PostList extends React.Component {
  state = {
    posts: [],
    alerts: []
  }

  componentDidMount() {
    fetchPosts().then(posts => this.setState({posts: posts}))

    if (this.props.location.state && this.props.location.state.alert) {
      const alert = this.props.location.state.alert;
      this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {}
      });
      this.setState({alerts: [...this.state.alerts, alert]})
    }
  }


  removePost = (id) => {
    const posts = this.state.posts.filter((p) => p.id !== id)
    const alert = {variant: 'danger', text: 'Removed Post'}
    this.setState({
      posts: posts,
      alerts: [...this.state.alerts, alert]
    })
  }

  render() {
    return (
      <Container>
        <Alerts alerts={this.state.alerts} />
        <Row>
          {this.state.posts.map(post =>
            <Col key={post.id} md={6} className="my-2">
              <Post brief={true} post={post}>
                  <AdminPostActions id={post.id} onDelete={this.removePost} />
              </Post>
            </Col>
          )}
        </Row>
      </Container>
    )
  }
}

export default PostList;
