import React from 'react';

import AdminPostActions from '../admin/AdminPostActions.js'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoadingContainer from '../elements/LoadingContainer.js'
import Alerts from '../elements/Alerts.js'
import Pages from '../elements/Pages.js'
import Post from './Post.js'

const fetchPosts = async (page) => {
  const hr = await fetch(`/api/posts/?page=${page}`)
  const data = await hr.json();
  return data
}

class PostList extends React.Component {
  state = {
    posts: [],
    alerts: [],
    loading: true
  }

  componentDidMount() {
    this.updatePage()
    if (this.props.location.state && this.props.location.state.alert) {
      const alert = this.props.location.state.alert;
      this.props.history.replace({
        pathname: this.props.location.pathname,
        state: {}
      });
      this.setState({ alerts: [...this.state.alerts, alert] })
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.page !== prevProps.match.params.page) {
      this.updatePage()
    }
  }

  updatePage = () => {
    const page = this.props.match.params.page !== undefined 
      ? this.props.match.params.page - 1
      : 0
    this.setState({loading: true})
    fetchPosts(page).then(result => this.setState({
      ...result,
      loading: false
    }))
  }

  removePost = (id, ok) => {
    if (ok) {
      const posts = this.state.posts.filter((p) => p.id !== id)
      const alert = { variant: 'danger', text: 'Removed Post' }
      this.setState({
        posts: posts,
        alerts: [...this.state.alerts, alert]
      })
    } else {
      this.setState({
        alerts: [
          ...this.state.alerts, { variant: 'danger', text: 'Failed to remove post' }]
      })
    }
  }

  render() {
    return (
      <LoadingContainer loading={this.state.loading}>
        <Row>
          {this.state.posts.map(post =>
            <Col key={post.id} md={6} className="my-2">
              <Post brief={true} post={post}>
                <AdminPostActions id={post.id} onDelete={this.removePost} />
              </Post>
            </Col>
          )}
        </Row>
        <Alerts alerts={this.state.alerts} />
        <Pages 
          pages={this.state.pages}
          page={this.state.page !== undefined ? this.state.page : 1}
          onPageChange={this.updatePage} />
      </LoadingContainer>
    )
  }
}

export default PostList;
