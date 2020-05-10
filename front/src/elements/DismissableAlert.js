import React from 'react';

import Alert from 'react-bootstrap/Alert';


class DismissableAlert extends React.Component {
  state = {
    variant: '',
    text: '',
    hidden: false
  }

  componentDidMount() {
    this.setState({
      variant: this.props.variant || 'primary',
      text: this.props.text,
    })
  }

  hide = () => {
    this.setState({hidden: true})
  }

  render() {
    if(!this.state.hidden) {
      return (
        <Alert variant={this.state.variant} dismissible onClose={this.hide}>
          {this.state.text}
        </Alert>
      )
    } else {
      return null
    }
  }
}

export default DismissableAlert;
