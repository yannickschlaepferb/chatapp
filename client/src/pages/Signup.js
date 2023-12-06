import React from "react";
import { useState } from "react";
import './Signup.css'
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const createUser = async () => {
        try {
          const response = await axios.post('http://localhost:3000/signup', { username:username, password:password }, { withCredentials: true });
          console.log('user created successfully:', response.data);
          //setTimeout(() => {
            //navigate("/vault");
          //}, 10)
        } catch (error) {
          console.log('user creation failed:', error.message);
        }
      }

    return(
        <div>
            <h1 className="title">Signup</h1>
            <div className="login-input">
            <input className="login" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
            <input className="login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
            <br />
            <br />
            <button className="login-btn" onClick={createUser}>Signup</button>
            </div>
        </div>
    )
}

export default Signup;