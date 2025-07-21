import {useState} from 'react';
export default function Registerpage() {
    const [username,setusername]=useState('');
    const [email,setemail]=useState('');    
    const [password,setpassword]=useState('');
     const baseURL=process.env.REACT_APP_API_URL;
    async function register(ev) {
  ev.preventDefault();
  try {
    const response = await fetch(`${baseURL}/register`, {
      credentials:'include',
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const userInfo = await response.json();
    
    if (response.ok) {
      alert('Registration successful');
    } else {
      console.log("Error from server:", userInfo); // Show what went wrong
      alert('Registration failed');
    }
  } catch (err) {
    console.error("Network error:", err);
    alert('Registration failed - Network issue');
  }
}

    return(
      <div className="auth-container">
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text"
             placeholder="username" 
             value={username} 
             onChange={ev=>setusername(ev.target.value)}/>
            <input type="email"
             placeholder="email"
             value={email}
             onChange={ev=>setemail(ev.target.value)} />
            <input type="password"
             placeholder="password"
             value={password}
             onChange={ev=>setpassword(ev.target.value)} />
            <button>Register</button>
        </form>
        </div>
    );
}