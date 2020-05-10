import React from 'react';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';


class LoadingContainer extends React.Component {
  render() {
    if(this.props.loading) {
      return (
        <Container className="text-center">
          <Spinner animation="border" variant="dark" />
        </Container>
      )
    } else {
      return (
        <Container>
          {this.props.children}
        </Container>
      )
    }
  }
}

export default LoadingContainer;
