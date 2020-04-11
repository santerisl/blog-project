import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

const fetchPost = async (id) => {
  const hr = await fetch(`/api/posts/${id}`)
  const data = await hr.json();

  if(data.error) {
    data.title = data.status
  }

  return data
}

class Post extends Component {

  state = {
    loading: true,
    post: {}
  }

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    if(this.props.post) {
      this.setState({post: this.props.post, loading: false})
    } else if(this.props.match.params.id) {
      fetchPost(this.props.match.params.id)
        .then(post => this.setState({post: post, loading: false}))
    }
  }

  render() {
    console.log(this.state.post)
    if(!this.state.loading) {
      const post = this.state.post; 
      const content = this.props.brief ? post.brief : post.content
      const date = new Date(post.date).toLocaleDateString('fi')
      return (
        <Card className="h-100">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {post.author}
            </Card.Subtitle>
            <Card.Text className="post-content">
              {content}
            </Card.Text>
            
          </Card.Body>
          <Card.Footer className="text-muted">
            {date} {this.props.children}
          </Card.Footer>
        </Card>
      )
    } else {
      return <div>Loading... :)</div>
    }
  }
}

export default Post;
