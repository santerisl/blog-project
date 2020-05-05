import React, { Component } from 'react';

import { AdminContext } from './admin/AdminContext'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CommentForm from './CommentForm'

const Comment = (props) => {
  const comment = props.comment;
  const date = new Date(comment.date).toLocaleDateString('fi')
  return (
    <Card className="h-100">
      <Card.Header>
        {comment.author} - {date}
      </Card.Header>
      <Card.Body>
        <Card.Text className="post-content">
          {comment.content}
        </Card.Text>
      </Card.Body>
    
      {props.children}
    
    </Card>
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
      this.setState({comments: comments})
    })
  }

  onSubmit = (data) => {
    postComment(data, this.props.id).then((response) => {
      const location = response.headers.get('Location')
      data.id = location.split('/').pop()
      this.setState({comments: [data, ...this.state.comments]})
    })
  }

  onDelete = (id) => {
    deleteComment(id).then((result) => {
      const comments = this.state.comments.filter((c) => c.id !== id)
      this.setState({comments: comments})
    })
  }

  render() {
    const comments = this.state.comments;
    const isLoggedIn = this.context.user.name !== undefined
    return (
      <Container>

        <Row>
          <Col className="my-4">
            <CommentForm onSubmit={this.onSubmit} />
          </Col>
        </Row>

        {comments.map(comment =>
          <Row key={comment.id}>
            <Col className="my-2">
              <Comment comment={comment}>
                { isLoggedIn 
                  ? <Button onClick={() => this.onDelete(comment.id)} variant="danger">
                      Delete
                    </Button>
                  : null
                }
              </Comment>
            </Col>
          </Row>
        )}
      </Container>
    )
  }
}

Comments.contextType = AdminContext;

export default Comments;
