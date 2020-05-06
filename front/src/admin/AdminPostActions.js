import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import AdminDropdown from './AdminDropdown'
import Dropdown from 'react-bootstrap/Dropdown';


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
    return (
      <AdminDropdown>
          <LinkContainer to={`/modify/${this.props.id}`}>
            <Dropdown.Item>Modify</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item onClick={this.onDelete}>Delete</Dropdown.Item>
      </AdminDropdown>
    )
  }
}

export default AdminPostActions;
