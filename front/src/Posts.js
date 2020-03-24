import React from 'react';

const fetchPosts = async () => {
  const hr = await fetch('http://localhost:8080/api/posts/')
  const data = await hr.json();
  console.log(data)
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
    return (
      <div key={post.id} className="blog-post">
        <h2>{post.title}</h2>
        <div className="post-date">
          Posted: {post.date}
        </div>
        <div className="post-author">
          By: {post.author}
        </div>
        <p className="post-content">
          {post.content}
        </p>
      </div>
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
