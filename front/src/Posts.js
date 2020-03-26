import React from 'react';

import './Posts.css'


const fetchPosts = async () => {
  const hr = await fetch('/api/posts/')
  const data = await hr.json();
  return data
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []}
  }
  
  componentDidMount() {
    fetchPosts().then(posts => this.setState({posts: posts}))
  }

  renderPost = post => {
    const date = new Date(post.date).toLocaleDateString('fi-FI')
    return (
      <article key={post.id} className="Post">
        <div className="PostHeader">
          <h1 className="PostTitle">{post.title}</h1>
          <div className="PostDate">{date}</div>
        </div>
        <div className="PostAuthor">{post.author}</div>
        <div className="PostContent">{post.content}</div>
      </article>
    )
  }

  render() {
    const data = this.state.posts;
    return (
    <div>
      {data.map(data => this.renderPost(data))}
    </div>
    )
  }
}

export default Posts;
