import React, { Component } from 'react';

import { AdminContext } from './AdminContext'

import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';


const style = {
  top: 0,
  right: 0,
  transform: 'translate(25%, -25%)'
};

class AdminDropdown extends Component {

  render() {
    const ctx = this.context
    const isLoggedIn = ctx.user.name !== undefined
    if (isLoggedIn) {
      return (
        <div className="position-absolute" style={style}>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="link" className="no-arrow">
              {this.props.loading
                ? <Spinner variant="danger" animation="border" size="sm" />
                : <Image src="/settings-black.svg" alt="Settings" /> }
            </Dropdown.Toggle>
            <Dropdown.Menu className="m-0">
                {this.props.children}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )
    } else {
      return null
    }
  }
}

AdminDropdown.contextType = AdminContext;

export default AdminDropdown;
