import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


class LoadingButton extends React.Component {
  render() {
      return (
        <Button variant={this.props.variant} type="submit" disabled={this.props.loading}>
            {this.props.loading
                ? <Spinner animation="grow" size="sm" variant="dark" /> 
                : null }
            {this.props.children}
        </Button>
      )
  }
}

export default LoadingButton;
