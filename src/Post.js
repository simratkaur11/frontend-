import { Link } from "react-router-dom";
import './Post.css'; // optional styling file

export default function Post({ _id, title, summary, cover, createdAt }) {
  return (
    <div className="post-wrapper">
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:4000${cover}`} alt={title} />
          </Link>
        </div>
        <div className="texts">
          <h2>
            <Link to={`/post/${_id}`}>{title}</Link>
          </h2>
          <p className="info">
            <span className="author">Unknown</span>
            <time>{new Date(createdAt).toLocaleDateString()}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </div>
  );
}
