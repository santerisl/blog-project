import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';

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
    </Card>
  )
}


class Comments extends Component {

  render() {
    const comments = this.props.comments;
    return (
      <Container>

        <CommentForm />

        {comments.map(comment =>
          <Row key={comment.id}>
            <Col className="my-2">
              <Comment comment={comment} />
            </Col>
          </Row>
        )}
      </Container>
    )
  }
}

export default Comments;
