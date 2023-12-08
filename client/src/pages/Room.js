import React from "react";
import ErrorPopup from "../components/ErrorPopup";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Room() {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
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

  const createRoom = async () => {
    try {
      if (!room) {
        setError("Please fill in all fields.");
        setShowErrorPopup(true);
        return;
      }

      const response = await axios.post("http://localhost:3001/room", {
        id,
        room,
      });
      console.log("Room created successfully:", response.data);

      const newRoomId = response.data.roomId;

      if (newRoomId) {
        setRoomId(newRoomId);
        setTimeout(() => {
          navigate(`/chat/${username}/${id}/${room}/${newRoomId}`);
          addUsertoRoom(newRoomId);
        }, 10);
      } else {
        console.error("Room Id not found");
      }
    } catch (error) {
      console.log("room creation failed:", error);
      setError("room creation failed.");
      setShowErrorPopup(true);
    }
  };

  const addUsertoRoom = async (roomId) => {
    try {
      if (!roomId) {
        console.error("Room Id not found");
        return;
      }

      const response = await axios.post("http://localhost:3001/user-room", {
        id,
        roomId,
      });
      console.log(`${username} added to Room: ${room}, Id: ${roomId}`);
    } catch (error) {
      console.log("Error adding user to room:", error);
    }
  };

  const closeErrorPopup = () => {
    console.log("close popup");
    setShowErrorPopup(false);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white text-2xl text-center flex justify-center flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">Create / Join a Room</h1>
      <div className="flex flex-col gap-2">
        <input
          className="px-5 outline-none rounded text-black "
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter Room Name"
        ></input>
      <div className="rounded bg-opacity-50 bg-white py-1 px-2 hover:bg-blue-400 hover:shadow hover:shadow-black hover:shadow-md">
        <button onClick={createRoom}>Create / Join Room</button>
      </div>
      </div>
      <div>
        {showErrorPopup && (
          <ErrorPopup message={error} onClose={closeErrorPopup} />
        )}
      </div>
    </div>
  );
}

export default Room;
