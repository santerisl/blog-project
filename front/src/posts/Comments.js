import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import CommentForm from '../forms/CommentForm'
import BlogCard from '../elements/BlogCard'
import Comment from './Comment'

async function postComment(data, id) {
  const response = await fetch(`/api/comments/add/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response;
}

class Comments extends Component {
  onSubmit = (data, callback) => {
    postComment(data, this.props.id).then((response) => {
      if(response.ok) {
        const location = response.headers.get('Location')
        data.id = location.split('/').pop()
        data.date = Date.now()
        callback(true)
        this.props.onAdd(data)
      } else {
        callback(false)
      }
    })
  }

  render() {
    const comments = this.props.comments;
    return (
      <div>
        <Container className="mt-4">{comments.length > 0 ? 'Comments' : 'No comments'}</Container>
        {comments.map(comment =>
          <Comment comment={{...comment, postId: this.props.id}} key={comment.id} 
            onDelete={this.props.onDelete} />
        )}
        <BlogCard
          title="Add comment"
          content={<CommentForm onSubmit={this.onSubmit} />}>
        </BlogCard>
      </div>
    )
  }
}

export default Comments;
