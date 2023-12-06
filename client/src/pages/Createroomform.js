import React, { useState } from 'react';
import axios from 'axios';

const Createroomform = ({ onRoomCreated }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3001/rooms', { name: roomName });
      onRoomCreated(response.data.roomId);
      setRoomName('');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default Createroomform;
