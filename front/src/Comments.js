import React, { Component } from 'react';

import { AdminContext } from './admin/AdminContext'


import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

import CommentForm from './CommentForm'
import BlogCard from './BlogCard'

const Comment = (props) => {
  const comment = props.comment;
  const date = new Date(comment.date).toLocaleDateString('fi')
  return (
    <BlogCard
      subtitle={comment.author}
      content={comment.content}
      footer={date}>
      {props.children}
    </BlogCard>
  )
}

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

const deleteComment = async (id) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });
  return response;
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

  onSubmit = (data) => {
    postComment(data, this.props.id).then((response) => {
      const location = response.headers.get('Location')
      data.id = location.split('/').pop()
      this.setState({ comments: [data, ...this.state.comments] })
    })
  }

  onDelete = (id) => {
    deleteComment(id).then((result) => {
      const comments = this.state.comments.filter((c) => c.id !== id)
      this.setState({ comments: comments })
    })
  }

  render() {
    const comments = this.state.comments;
    const isLoggedIn = this.context.user.name !== undefined
    return (
      <div>
        <BlogCard
          title="Comment"
          content={<CommentForm onSubmit={this.onSubmit} />}>
        </BlogCard>

        {comments.map(comment =>
          <Comment comment={comment}>
            {isLoggedIn
              ? <Button onClick={() => this.onDelete(comment.id)} 
                  variant="danger">Delete</Button>
              : null}
          </Comment>
        )}
      </div>
    )
  }
}

Comments.contextType = AdminContext;

export default Comments;
