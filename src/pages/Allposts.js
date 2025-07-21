// // src/AllPosts.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function AllPosts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/post")
//       .then(res => res.json())
//       .then(posts => setPosts(posts));
//   }, []);

//   return (
//     <div>
//     <div className="posts-section">
//       <h2>Latest Blogs</h2>
//       <div className="posts-grid">
//         {posts.length > 0 && posts.map(post => (
//           <div key={post._id} className="post-card">
//             <img src={`http://localhost:4000${post.cover}`} alt={post.title} />
//             <h3>{post.title}</h3>
//             <p>{post.summary}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className="posts-preview-section">
//   <h2>Want to read something interesting? 📝</h2>
//   <Link to="/blogs" className="preview-link">Explore All Blogs →</Link>
// </div>
// </div>
//   );
// }



// src/AllPosts.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import './AllPosts.css';

// export default function AllPosts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/post")
//       .then(res => res.json())
//       .then(posts => setPosts(posts));
//   }, []);

//   return (
//     <div>
//       <div className="posts-section">
//         <h2>Latest Blogs</h2>
//         <div className="posts-grid">
//           {posts.length > 0 && posts.map(post => (
//             <Link to={`/post/${post._id}`} key={post._id} className="post-card">
//               <img src={`http://localhost:4000${post.cover}`} alt={post.title} />
//               <h3>{post.title}</h3>
//               <p>{post.summary}</p>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="posts-preview-section">
//         <h2>Want to read something interesting? 📝</h2>
//         <Link to="/blogs" className="preview-link">Explore All Blogs →</Link>
//       </div>
//     </div>
//   );
// }




// src/AllPosts.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AllPosts.css'; // Ensure you have this CSS file for styling

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
   const baseURL=process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/post`)
      .then(res => res.json())
      .then(posts => setPosts(posts));
  }, []);

  return (
    <div>
      <div className="posts-section">
        <h2>Latest Blogs</h2>
        <div className="posts-grid">
          {posts.length > 0 && posts.map(post => (
            <Link to={`/post/${post._id}`} key={post._id} className="post-row-card">
              <div className="post-image">
                <img src={`http://localhost:4000${post.cover}`} alt={post.title} />
              </div>
              <div className="post-info">
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <p className="meta">🖋️ {post.author?.username} · 📅 {new Date(post.createdAt).toDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="posts-preview-section">
        <h2>Got the meowtivation click below to create your own 🖼️</h2>
        <Link to="/create" className="preview-link">Create Blog →</Link>
      </div>
    </div>
  );
}
