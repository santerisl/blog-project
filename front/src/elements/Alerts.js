import React from 'react';

import DismissableAlert from './DismissableAlert.js';
import Container from 'react-bootstrap/Container';

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
}

class Alerts extends React.Component {

  render() {
    return (
      <Container style={style}>
        {this.props.alerts.map((alert, id) =>
            <DismissableAlert key={id} 
              variant={alert.variant} 
              text={alert.text} />)}
      </Container>
    )
  }
}

export default Alerts;
