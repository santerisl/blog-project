import React, { Component } from 'react';

import './Post.css'

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
    post: {}
  }

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    if(this.props.post) {
      this.setState({post: this.props.post})
    } else if(this.props.match.params.id) {
      fetchPost(this.props.match.params.id)
        .then(post => this.setState({post: post}))
    }
  }

  render() {
    console.log(this.props)
    if(this.state.post) {
      const post = this.state.post; 
      const content = this.props.brief ? post.brief : post.content
      const date = new Date(post.date).toLocaleDateString('fi')
      return (
        <article className="Post">
          <div className="PostHeader">
            <h1 className="PostTitle">{post.title}</h1>
            <div className="PostDate">{date}</div>
          </div>
          <div className="PostAuthor">{post.author}</div>
          <div className="PostContent">{content}</div>
          {this.props.children}
        </article>
      )
    } else {
      return <div>Loading... :)</div>
    }
  }
}

export default Post;
