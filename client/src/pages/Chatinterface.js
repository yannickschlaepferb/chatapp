import React, { useState, useEffect } from "react";
import "./Chatinterface.css";
import { useUser } from "../components/Usercontext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Chat() {
  const [leftContainerVisible, setLeftContainerVisible] = useState(true);
  const { loggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { username, id, roomId, room } = useParams();
  const [addUsername, setAddUsername] = useState("");

  const addUser = async () => {
    try {
      if (!addUsername) {
        return;
      }

      const userResponse = await axios.get(
        `http://localhost:3000/get-user/${addUsername}`
      );
      const userId = userResponse.data.message[0].id;

      console.log("Adding user with userId:", userId, "to roomId:", roomId);

      const response = await axios.post("http://localhost:3000/add-user", {
        userId: userId,
        roomId: roomId,
      });

      console.log("Response from server:", response.data);
      console.log(`User ${addUsername} added to Room ${roomId} successfully`);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const sendMsg = async () => {
    try {
      if (!message.trim()) {
        return;
      }

      console.log("Sending message with:", { id, roomId, message });
      const response = await axios.post("http://localhost:3000/send-message", {
        senderId: id,
        roomId: roomId,
        content: message,
      });

      console.log("Message sent successfully:", response.data);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const [gridStyle, setGridStyle] = useState({
    display: "grid",
    gridTemplateColumns: "30% 70%",
  });

  const handleToggle = () => {
    setLeftContainerVisible(!leftContainerVisible);
    if (!leftContainerVisible) {
      setGridStyle({
        display: "grid",
        gridTemplateColumns: "30% 70%",
      });
    } else {
      setGridStyle({
        display: "grid",
        gridTemplateColumns: "100%",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setLeftContainerVisible(false);

        setGridStyle({
          display: "grid",
          gridTemplateColumns: "100%",
        });
      } else {
        setLeftContainerVisible(true);

        setGridStyle({
          display: "grid",
          gridTemplateColumns: "30% 70%",
        });
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlelogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 10);
    console.log("successfully logged out");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-messages/${roomId}/${id}`
        );
        setMessages(response.data.messages);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
      console.log(message);
    };

    fetchMessages();
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [roomId]);

  return (
    <div className="container" style={gridStyle}>
      {leftContainerVisible && (
        <div className="left-container">
          <div className="title-container">
            <p className="logo">Chat App</p>
          </div>
          <div className="user-container">
            <div className="username">
              <h3>Username: {username}</h3>
              <h3>Room : {room}</h3>
            </div>
            <div className="add-user-container">
              <h2 className="add-user-title">Add User to Room</h2>
              <input
                className="add-user"
                value={addUsername}
                onChange={(e) => setAddUsername(e.target.value)}
                placeholder="Enter Username"
              ></input>
            </div>
            <div className="add-user-btn-container">
              <button className="add-user-btn" onClick={addUser}>
                Add User
              </button>
            </div>
            <div className="line"></div>
            <div className="create-room-contianer">
              <h2 className="add-user-title">Create a new Room</h2>
              <Link to={`/room/${username}/${id}`}>
                <button className="create-room">Create Room</button>
              </Link>
            </div>
            <div className="line"></div>
          </div>
        </div>
      )}
      <div className="right-container">
        <div className="logout-container">
          {window.innerWidth <= 768 && (
            <div>
              <input
                onClick={handleToggle}
                className="toggle-btn"
                type="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
              </label>
            </div>
          )}
          <button className="logout-btn" onClick={handlelogout}>
            logout
          </button>
        </div>
        <div className="messages-container" >
          {messages.map((message) => (
            <div key={message.id} className={message.senderId.toString() === id ? "sent-message" : "received-message"} >
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            className="msg-input"
            name="text"
            placeholder="Type something..."
            type="search"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-btn" onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
