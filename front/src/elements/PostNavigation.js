import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BlogCard from './BlogCard'
import ReadMoreButton from './ReadMoreButton'


class PostNavigation extends React.Component {

  render() {
    if (this.props.next === undefined && this.props.prev === undefined) {
      return null
    }

    return (
      <Row>
        {this.props.prev
          ? <Col><BlogCard
            subtitle="Previous post"
            content={this.props.prev.title}>
              <ReadMoreButton id={this.props.prev.id} />
            </BlogCard></Col>
          : null}

        {this.props.next
          ? <Col><BlogCard
            subtitle="Next post"
            content={this.props.next.title}>
              <ReadMoreButton id={this.props.next.id} />
            </BlogCard></Col>
          : null}
      </Row>
    )
  }
}

export default PostNavigation;
