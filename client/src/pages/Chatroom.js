import React from "react";
import ErrorPopup from "../components/ErrorPopup";
import './Signup.css'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Room () {
    const [room, setRoom] = useState("");
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const { username: paramUsername, id: paramId } = useParams();
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        setUsername(paramUsername);
        setId(paramId);
    }, [paramUsername, paramId]);

    const createRoom = async() => {
     try {
      if (!room) {
        setError('Please fill in all fields.');
        setShowErrorPopup(true);
        return;
      }

      const response = await axios.post('http://localhost:3000/room', { id, room });
      console.log('Room created successfully:', response.data);

      const newRoomId = response.data.roomId;

      if (newRoomId) {
        setRoomId(newRoomId);
        setTimeout(() => {
        navigate(`/chat/${username}/${id}/${room}/${newRoomId}`);
        addUsertoRoom(newRoomId);
      }, 10);
    } else {
        console.error('Room Id not found')
    }
    } catch (error) {
      console.log('room creation failed:', error);
      setError('room creation failed.'); 
      setShowErrorPopup(true);
    }}

    const addUsertoRoom = async (roomId) => {
        try {
          if (!roomId) {
            console.error('Room Id not found');
            return;
          }
      
          const response = await axios.post('http://localhost:3000/user-room', { id, roomId });
          console.log(`${username} added to Room: ${room}, Id: ${roomId}`);
        } catch (error) {
          console.log('Error adding user to room:', error);
        }
      };
      
    const closeErrorPopup = () => {
        console.log('close popup');
        setShowErrorPopup(false);
      };

    return(
        <div className="room-body">
          <div className="space"></div>
            <h1 className="signup-title">Create a Room</h1>
            <div className="space1"></div>
           <div className="signup-input">
                <input className="signup" type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter Room Name"></input>
                <label for="signup-username" className="signup-label">Enter Room Name</label>
                <span className="signup-highlight"></span>
              </div>
              <div className="signup-btn-container">
                <button onClick={createRoom} className="signup-btn">Create Room</button>
              </div>
              <div>
                {showErrorPopup && <ErrorPopup message={error} onClose={closeErrorPopup} />}
              </div>
        </div>
    )
}

export default Room;