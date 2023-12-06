import React from "react";
import { useState } from "react";
import './Signup.css'
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();

    const createUser = async () => {
        try {
          if (!username || !password) {
            setError('Please fill in all fields.');
            setShowErrorPopup(true);
            return;
          }
    
          const response = await axios.post('http://localhost:3000/signup', { username, password });
          console.log('user created successfully:', response.data);
          setTimeout(() => {
            navigate("/login");
          }, 10);
        } catch (error) {
          console.log('user creation failed:', error);
          setError('User creation failed.'); 
          setShowErrorPopup(true);
        }
      }

      const closeErrorPopup = () => {
        console.log('close popup')
        setShowErrorPopup(false);
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
            <div>
                {showErrorPopup && <ErrorPopup message={error} onClose={closeErrorPopup} />}
            </div>
        </div>
    )
}

export default Signup;