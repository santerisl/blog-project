import React, { Component } from 'react';

import { AdminContext } from './AdminContext'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class AdminPostActions extends Component {

  render() {
    let ctx = this.context
    let isLoggedIn = ctx.user.name && ctx.user.name != ''
    if(isLoggedIn) {
      return (
        <Card.Footer className="d-flex">
          <Button className="w-100" size="sm" variant="primary">Modify</Button>
          <Button className="w-100" size="sm" variant="danger">Delete</Button>
        </Card.Footer>
      )
    } else {
      return null
    }
  }
}

AdminPostActions.contextType = AdminContext;

export default AdminPostActions;
