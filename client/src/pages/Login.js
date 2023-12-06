import { useState } from "react";
import axios from "axios";
import './css/Login.css'


function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log('login successful:', response.data);
    } catch (error) {
      console.log('login failed:', error);
    }
  }
  
    return (
        <div>
            <h1 className="login-title">Log in</h1>
            <input className="login-username" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
            <br />
            <input className="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>
            <br />
            <input className="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
            <br />
            <button onClick={login}>Log in</button> 
    </div>
    );
  }
  
  export default Login;