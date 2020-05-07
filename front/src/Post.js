import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import BlogCard from './BlogCard'

async function putLike(id) {
  const response = await fetch(`/api/posts/${id}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
}

const ReadMoreButton = (props) => {
  return (
    <LinkContainer to={`/posts/${props.id}`}>
      <Card.Link className="text-center">
        Read more...
      </Card.Link>
    </LinkContainer>
  )
}

const DateTooltip = (props) => {
  console.log(props, props.modified)
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 100, hide: 0 }}
      overlay={
        <div className="date-tooltip">
          <div><span>Posted:</span><span>{new Date(props.posted).toLocaleString('fi')}</span> </div>
          {props.modified
            ? <div><span>Modified:</span><span>{new Date(props.modified).toLocaleString('fi')}</span></div>
            : null}
        </div>
      }>
      <span>
        {new Date(props.posted).toLocaleDateString('fi')}
        {props.modified ? '*' : ''}
      </span>
    </OverlayTrigger>
  )
}


const Footer = (props) => {
  const likeClass = 'icon likes' + (props.liked ? ' active' : '')
  return (
    <Row className="post-footer">
      <Col className="text-center">
        <button className={likeClass} onClick={props.onLike}>
          {props.likes}
        </button>
      </Col>
      <Col className="text-center">
        <span className="icon comments">{props.comments}</span>
      </Col>
      <Col className="text-center">
        <DateTooltip posted={props.posted} modified={props.modified} />
      </Col>
    </Row>
  )
}

class Post extends Component {

  state = { liked: false, like: 0 }

  componentDidMount() {
    const liked = localStorage.getItem(`like:${this.props.post.id}`) || false
    this.setState({ liked: liked, likes: this.props.likes })
  }

  onLikeClick = (event) => {
    event.preventDefault()
    if (!this.state.liked) {
      putLike(this.props.post.id).then((response) => {
        if (response.ok) {
          this.setState({ liked: true, like: 1 })
          localStorage.setItem(`like:${this.props.post.id}`, true)
        }
      })
    }
  }

  render() {
    const post = this.props.post;
    const content = this.props.brief ? post.brief : post.content
    return (
      <BlogCard
        title={post.title}
        subtitle={post.author}
        content={content}
        footer={
          <Footer posted={this.props.post.date} modified={this.props.post.modifiedDate}
            comments={post.commentCount}
            liked={this.state.liked}
            likes={this.props.post.likes + this.state.like}
            onLike={this.onLikeClick} />
        }>
        {this.props.children}
        {this.props.brief ? <ReadMoreButton id={post.id} /> : null}
      </BlogCard>
    )
  }
}

export default Post;
