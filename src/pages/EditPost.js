import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css'

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState('');
  const baseURL=process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${baseURL}/post/${id}`,{withCredentials:true}).then(res => {
      const post = res.data;
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content.replace(/<[^>]+>/g, ""));
       setExistingCoverUrl(post.cover);
    });
  }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:4000/post/${id}`, {
//         title,
//         summary,
//         content,
//         cover,
//       }, {
//         withCredentials: true
//       });

//       navigate(`/post/${id}`);
//     } catch (err) {
//       alert('Failed to update');
//     }
//   };
 const handleUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("summary", summary);
  formData.append("content", content);
  if (cover) formData.append("cover", cover);

  try {
    await axios.put(`${baseURL}/post/${id}`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    navigate(`/post/${id}`);
  } catch (err) {
    alert("Failed to update");
  }
};

  return (
    <form onSubmit={handleUpdate} className="post-form">
      <h2>Edit Post</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" required />
      {existingCoverUrl && (
  <div>
    <p>Current Image:</p>
    <img 
      src={`${baseURL}/${existingCoverUrl}`} 
      alt="Cover" 
      style={{ width: '200px', borderRadius: '10px', marginBottom: '10px' }} 
    />
  </div>
)}

<input 
  type="file" 
  onChange={(e) => setCover(e.target.files[0])} 
  accept="image/*"
/>


      <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" placeholder="Write your blog..." />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
