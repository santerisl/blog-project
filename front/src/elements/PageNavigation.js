import React from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

class PageNavigation extends React.Component {

  render() {
    const links = [];
    for (let i = 1; i <= this.props.pages; i++) {
      links.push(
        <LinkContainer to={`/page/${i}`} key={i}>
          <Nav.Link 
            className={this.props.page === i ? 'active' : ''}>
            {i}
          </Nav.Link>
        </LinkContainer>
      )
    }
    return (
      <Card className="h-100 my-2">
        <Nav className="justify-content-center pages"
          activeKey={`/page/${this.props.page}`}>
            {links}
        </Nav>
      </Card>
    )
  }
}

export default PageNavigation;
