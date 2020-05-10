import React from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import Card from 'react-bootstrap/Card';

class ReadMoreButton extends React.Component {
  render() {
    return (
      <LinkContainer to={`/posts/${this.props.id}`}>
        <Card.Link className="text-center">
          Read more...
        </Card.Link>
      </LinkContainer>
    )
  }
}

export default ReadMoreButton;
