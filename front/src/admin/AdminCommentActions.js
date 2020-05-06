import React, { Component } from 'react';

import AdminDropdown from './AdminDropdown'
import Dropdown from 'react-bootstrap/Dropdown';

const deleteComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    return response;
}

class AdminPostActions extends Component {

  state = {loading: false}

  onDelete = () => {
    this.setState({loading: true})
    deleteComment(this.props.id).then((response) => {
        this.setState({loading: false})
        this.props.onDelete(this.props.id, response.ok)
    })
  }

  render() {
    return (
      <AdminDropdown loading={this.state.loading}>
          <Dropdown.Item onClick={this.onDelete}>Delete</Dropdown.Item>
      </AdminDropdown>
    )
  }
}

export default AdminPostActions;
