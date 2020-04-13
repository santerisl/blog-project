import React from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import Card from 'react-bootstrap/Card';
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

  render() {
    return (
      <Container>
        <Row>
          {this.state.posts.map(post =>
            <Col key={post.id} md={6} className="my-2">
              <Post brief={true} post={post}>
                <LinkContainer to={`/posts/${post.id}`}>
                  <Card.Link className="float-right">
                    Read more...
                  </Card.Link>
                </LinkContainer>
              </Post>
            </Col>
          )}
        </Row>
      </Container>
    )
  }
}

export default PostList;
