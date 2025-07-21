import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React,{ useState } from "react";
import { Navigate } from "react-router-dom";

import './CreatePost.css';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [redirect, setRedirect] = useState(false);
     const baseURL=process.env.REACT_APP_API_URL;
    const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image'
    ];
    async function createnewpost(e){
        e.preventDefault();
        const data=new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]); // Assuming you have a file input for images
        
        const response=await fetch(`${baseURL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include', // Include cookies in the request
        });
        if(response.ok){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/blogs'} />
    }
    return(
        <>
        <div className="create-post-container">
        <form onSubmit={createnewpost} className="create-post-form">
            <h2>Create a New Blog Post</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)}/>
            <input type="file" onChange={(e)=>setFiles(e.target.files)}/>
            <ReactQuill 
                value={content} 
                onChange={setContent} 
                modules={modules} 
                formats={formats}
                placeholder="Write your blog content here..."
                className="quill-editor"
            />
            <button style={{ marginTop: '10px' }}>Create Post</button>
        </form>
        </div>
        </>
    );
}