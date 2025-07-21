import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllBlogs() {
  const [posts, setPosts] = useState([]);
  const baseURL=process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${baseURL}/post`,{credentials:'include'}).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="all-blogs-page">
      <h2>All Blog Posts</h2>
      <div className="posts-grid">
        {posts.length > 0 &&
          posts.map(post => (
            <Link to={`/post/${post._id}`} key={post._id} className="post-card">
              <div className="image">
                <img src={`${baseURL}/${post.cover}`} alt={post.title} />
              </div>
              <div className="content">
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <p className="meta">🖋️ {post.author?.username} · 📅 {new Date(post.createdAt).toDateString()}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default AllBlogs;
