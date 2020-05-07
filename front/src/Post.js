import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import BlogCard from './BlogCard'

const ReadMoreButton = (props) => {
  return (
    <LinkContainer to={`/posts/${props.id}`}>
      <Card.Link className="text-center">
        Read more...
      </Card.Link>
    </LinkContainer>
  )
}

const Footer = (props) => {
  return (
    <Row className="post-footer">
      <Col className="text-center">
        <a className="icon likes">{props.likes}</a>
      </Col>
      <Col className="text-center">
        <span className="icon comments">{props.comments}</span>
      </Col>
      <Col className="text-center">{props.date}</Col>
    </Row>
  )
}

class Post extends Component {
  render() {
    const post = this.props.post;
    const content = this.props.brief ? post.brief : post.content
    const date = new Date(post.date).toLocaleDateString('fi')
    return (
      <BlogCard
        title={post.title}
        subtitle={post.author}
        content={content}
        footer={<Footer date={date} comments={post.commentCount} likes={post.likes} />}>
          {this.props.children}
          {this.props.brief ? <ReadMoreButton id={post.id} /> : null}
      </BlogCard>
    )
  }
}

export default Post;
