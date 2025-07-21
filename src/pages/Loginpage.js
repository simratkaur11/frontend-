import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Loginpage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const { setUserInfo } = useContext(UserContext);
    const baseURL=process.env.REACT_APP_API_URL;

    async function login(ev) {
        ev.preventDefault();
        const response=await fetch(`${baseURL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // Include cookies in the request
        })
        if (response.ok) {
            const profileData = await response.json();
            setUserInfo(profileData);
            console.log("Profile:", profileData);

      // redirect user after login
            navigate('/blogs');  // <== your route
           } else {
           alert('Login failed');
           }
    }
    return(     
        <div className="auth-container">
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text"
             placeholder="username" 
             value={username} 
             onChange={ev=>setUsername(ev.target.value)}/>
            <input type="email"
             placeholder="email"
             value={email}
             onChange={ev=>setEmail(ev.target.value)} />
            <input type="password"
             placeholder="password" 
             value={password}
             onChange={ev=>setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
        </div>
    );

}