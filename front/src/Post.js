import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card';

const ReadMoreButton = (props) => {
  return (
    <LinkContainer to={`/posts/${props.id}`}>
      <Card.Link className="float-right">
        Read more...
      </Card.Link>
    </LinkContainer>
  )
}

class Post extends Component {

  render() {
    const post = this.props.post;
    const content = this.props.brief ? post.brief : post.content
    const date = new Date(post.date).toLocaleDateString('fi')
    return (
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.author}
          </Card.Subtitle>
          <Card.Text className="post-content">
            {content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {date} {this.props.brief ? <ReadMoreButton id={post.id} /> : null}
        </Card.Footer>
        {this.props.children}
      </Card>
    )
  }
}

export default Post;
