import React, { Component } from 'react';

import BlogCard from './BlogCard'

class Comment extends Component {
  render() {
    const comment = this.props.comment;
    const date = new Date(comment.date).toLocaleDateString('fi')
    return (
    <BlogCard
      subtitle={comment.author}
      content={comment.content}
      footer={date}>
      {this.props.children}
    </BlogCard>
  )
  }
}

export default Comment;
