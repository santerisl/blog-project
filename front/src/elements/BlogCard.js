import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import DismissableAlert from './DismissableAlert';

class BlogCard extends Component {
  render() {
    const style = this.props.removing ? {borderColor: 'red'} : {}
    if(!this.props.removed) {
      return (
        <Card className="h-100 my-2" style={style}>
          <Card.Body>
            {this.props.title
              ? <Card.Title>{this.props.title}</Card.Title>
              : null}
            {this.props.subtitle
              ? <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
              : null}
            {this.props.content
              ? <Card.Text as="div" className="post-content">{this.props.content}</Card.Text>
              : null}
          </Card.Body>
          {this.props.children}
          
          {this.props.footer
              ? <Card.Footer className="text-muted">{this.props.footer}</Card.Footer>
              : null}
        </Card>
      )
    } else {
      return (
        <DismissableAlert
          variant={alert.variant}
          text="Removed" />
      )
    }
  }
}

export default BlogCard;
