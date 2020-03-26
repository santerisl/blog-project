import React from 'react';
import { Link } from 'react-router-dom'
import Post from './Post.js'

const fetchPosts = async () => {
  const hr = await fetch('/api/posts/')
  const data = await hr.json();
  return data
}

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []}
  }
  
  componentDidMount() {
    fetchPosts().then(posts => this.setState({posts: posts}))
  }

  render() {
    return (
    <div className="Posts">
      {this.state.posts.map(post =>
          <Post key={post.id} brief={true} post={post}>
            <Link to={`/posts/${post.id}`}>Read more...</Link>
          </Post>)
      }
    </div>
    )
  }
}

export default PostList;
