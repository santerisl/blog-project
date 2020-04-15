import React from 'react';

import AdminPostActions from './admin/AdminPostActions.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Post from './Post.js'

const fetchPosts = async () => {
  const hr = await fetch('/api/posts/')
  const data = await hr.json();
  return data
}

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []}
  }
  
  componentDidMount() {
    fetchPosts().then(posts => this.setState({posts: posts}))
  }

  removePost = (id) => {
    const posts = this.state.posts.filter((p) => p.id !== id)
    this.setState({posts: posts})
  }

  render() {
    return (
      <Container>
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
