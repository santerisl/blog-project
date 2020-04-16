import React from 'react';

import DismissableAlert from './DismissableAlert.js';


class Alerts extends React.Component {

  render() {
    return (
      this.props.alerts.map(alert =>
        <DismissableAlert variant={alert.variant} text={alert.text} />
      )
    )
  }
}

export default Alerts;
