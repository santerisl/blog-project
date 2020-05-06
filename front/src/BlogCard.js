import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

class BlogCard extends Component {

  render() {
    const style = this.props.removing ? {borderColor: 'red'} : {}
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

        {this.props.footer
            ? <Card.Footer className="text-muted">{this.props.footer}</Card.Footer>
            : null}
        {this.props.children}
      </Card>
    )
  }
}

export default BlogCard;
