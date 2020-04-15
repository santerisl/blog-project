import React, { Component } from 'react';

import { AdminContext } from './AdminContext'
import { LinkContainer } from 'react-router-bootstrap'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


async function deletePost(id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
  return response;
}

class AdminPostActions extends Component {

  onDelete = () => {
    deletePost(this.props.id).then((response) => {
      this.props.onDelete(this.props.id)
    })
  }

  render() {
    const ctx = this.context
    const isLoggedIn = ctx.user.name !== undefined
    if(isLoggedIn) {
      return (
        <Card.Footer className="d-flex p-0">
          <LinkContainer to={`/modify/${this.props.id}`}>
            <Button className="w-100 rounded-0" size="sm" variant="primary">Modify</Button>
          </LinkContainer>

          <Button className="w-100 rounded-0" size="sm" variant="danger"
            onClick={this.onDelete}>Delete</Button>
        </Card.Footer>
      )
    } else {
      return null
    }
  }
}

AdminPostActions.contextType = AdminContext;

export default AdminPostActions;
