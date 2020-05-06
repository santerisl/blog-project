import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card';
import BlogCard from './BlogCard'

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
      <BlogCard
        title={post.title}
        subtitle={post.author}
        content={content}
        footer={<span>{date} {this.props.brief ? <ReadMoreButton id={post.id} /> : null}</span>}>
          {this.props.children}
      </BlogCard>
    )
  }
}

export default Post;
