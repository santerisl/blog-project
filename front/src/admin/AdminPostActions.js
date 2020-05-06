import React, { Component } from 'react';

import { AdminContext } from './AdminContext'
import { LinkContainer } from 'react-router-bootstrap'

import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';


const style = {
  top: 0,
  right: 0,
  transform: 'translate(25%, -25%)'
};

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
    if (isLoggedIn) {
      return (
        <div className="position-absolute" style={style}>
          <Dropdown drop="down">
            <Dropdown.Toggle variant="link" className="no-arrow">
              <Image src="/settings-black.svg" alt="Settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
              <LinkContainer to={`/modify/${this.props.id}`}>
                <Dropdown.Item>Modify</Dropdown.Item>
              </LinkContainer>
              <Dropdown.Item onClick={this.onDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )
    } else {
      return null
    }
  }
}

AdminPostActions.contextType = AdminContext;

export default AdminPostActions;
