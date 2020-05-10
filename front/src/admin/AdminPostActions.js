import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import AdminDropdown from './AdminDropdown'
import Dropdown from 'react-bootstrap/Dropdown';

async function deletePost(id) {
  console.log("delete", id)
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
  console.log(response)
  return response;
}

class AdminPostActions extends Component {

  state = {loading: false}

  onDelete = () => {
    this.setState({loading: true})
    deletePost(this.props.id).then((response) => {
      this.props.onDelete(this.props.id, response.ok)
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <AdminDropdown loading={this.state.loading}>
          <LinkContainer to={`/modify/${this.props.id}`}>
            <Dropdown.Item>Modify</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item onClick={this.onDelete}>Delete</Dropdown.Item>
      </AdminDropdown>
    )
  }
}

export default AdminPostActions;
