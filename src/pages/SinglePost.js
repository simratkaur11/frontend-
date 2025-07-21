
import { useEffect, useState , useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import "./Singlepost.css";
import axios from 'axios'

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const baseURL=process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/post/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  useEffect(() => {
    axios.get(`${baseURL}/post/${id}/comments`)
    .then(res => setComments(res.data));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const response = await fetch(`${baseURL}/post/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (response.ok) {
      alert("Post deleted!");
      navigate("/blogs"); // Redirect to all blogs page
    } else {
      alert("Failed to delete post");
    }
  };

  const handleCommentSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${baseURL}/post/${id}/comment`, { content: newComment }, {
      withCredentials: true
    });
    setNewComment("");
    const res = await axios.get(`${baseURL}/post/${id}/comments`);
    setComments(res.data);
  } catch (err) {
    alert("Failed to add comment");
  }
  };

  if (!post) return <div>Loading...</div>;

  const isAuthor = String(post.author?._id) === String(userInfo?.id);

  return (
    <>
    <div className="single-post-page">
    <div className="single-post">
      <h2>{post.title}</h2>
      <img className="pos-image" src={`${baseURL}/${post.cover}`} alt={post.title} />
    <div className="-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      {isAuthor && (
        <button className="delete-btn" onClick={handleDelete}>
          🗑️ Delete Post
        </button>
      )}
      {isAuthor && (
         <button className="edit-btn" onClick={() => navigate(`/edit/${post._id}`)}>
      ✏️ Edit Post
    </button>
    )}
    </div>
    </div>
    <div className="comments-section">
  <h3>Comments📝</h3>
  <form onSubmit={handleCommentSubmit} className="comment-form">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write your comment here..."
      rows="3"
      required
    />
    <button type="submit">Add Comment</button>
  </form>

  <div className="comment-list">
    {comments.length === 0 && <p>No comments yet.</p>}
    {comments.map((comment) => (
      <div key={comment._id} className="comment">
        <strong>{comment.author?.username || "Anonymous"}</strong>
        <p>{comment.content}</p>
        <small>{new Date(comment.createdAt).toLocaleString()}</small>
      </div>
    ))}
  </div>
</div>
</>
  );
}