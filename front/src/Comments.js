import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import { AdminContext } from './admin/AdminContext'
import AdminCommentActions from './admin/AdminCommentActions'
import CommentForm from './CommentForm'
import BlogCard from './BlogCard'
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

const fetchComments = async (id) => {
  const hr = await fetch(`/api/comments/${id}`)
  const data = await hr.json();

  return data
}

class Comments extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
    fetchComments(this.props.id).then((comments) => {
      this.setState({ comments: comments })
    })
  }

  onSubmit = (data, callback) => {
    postComment(data, this.props.id).then((response) => {
      if(response.ok) {
        const location = response.headers.get('Location')
        data.id = location.split('/').pop()
        data.date = Date.now()
        this.setState({ comments: [...this.state.comments, data] })
        callback(true)
      } else {
        callback(false)
      }
    })
  }

  removeComment = (id, ok) => {
    if(ok) {
      const comments = this.state.comments.filter((c) => c.id !== id)
      this.setState({ comments: comments })
    }
  }

  render() {
    const comments = this.state.comments;
    return (
      <div>
        <Container className="mt-4">{comments.length > 0 ? 'Comments' : 'No comments'}</Container>
        {comments.map(comment =>
          <Comment comment={comment} key={comment.id}>
            <AdminCommentActions id={comment.id} onDelete={this.removeComment} />
          </Comment>
        )}
        <BlogCard
          title="Add comment"
          content={<CommentForm onSubmit={this.onSubmit} />}>
        </BlogCard>
      </div>
    )
  }
}

Comments.contextType = AdminContext;

export default Comments;
