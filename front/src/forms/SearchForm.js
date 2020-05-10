import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


class CommentForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    if (event.target.checkValidity()) {
      let el = event.target.elements
      let title = el.title.value
      this.props.onSearch(title)
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} noValidate>
          <InputGroup className="mb-0">
            <FormControl id="title" placeholder="Search by title" className="mt-2" required />
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit" className="mt-2">
                Search
              </Button>
            </InputGroup.Append>
            {this.props.searching
              ?<InputGroup.Append>
                <Button variant="outline-danger" 
                  onClick={this.props.onCancel} className="mt-2">
                    Clear
                </Button>
              </InputGroup.Append>
            : null}

          </InputGroup>
        </Form>
      </Container>
    )
  }
}

export default CommentForm;
