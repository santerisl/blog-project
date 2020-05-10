import React, { Component } from 'react';
import AdminCommentActions from '../admin/AdminCommentActions'

import BlogCard from '../elements/BlogCard'
import Fade from 'react-bootstrap/Fade';
import DismissableAlert from '../elements/DismissableAlert';

class Comment extends Component {
  state = {visible: false, removed: false}

  componentDidMount() {
    this.setState({visible: true})
  }

  removeComment = (id, ok) => {
    if(ok) {
      this.setState({removed: true})
      this.props.onDelete()
    }
  }

  render() {
    const comment = this.props.comment;
    const date = new Date(comment.date).toLocaleDateString('fi')
    if(!this.state.removed) {
      return (
        <Fade in={this.state.visible && !this.state.removed}>
        <div>
          <BlogCard
            subtitle={comment.author}
            content={comment.content}
            footer={date}>
            {this.props.children}
            <AdminCommentActions id={comment.id} postId={comment.postId}onDelete={this.removeComment} />
          </BlogCard>
        </div>
      </Fade>
      )
    } else {
      return (
        <DismissableAlert variant="danger" text="Comment Removed" />
      )
    }
  }
}

export default Comment;
