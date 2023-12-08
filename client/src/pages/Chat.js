import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../components/Usercontext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Chat() {
  const messageContainerRef = useRef(null);
  const { loggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { username, id, roomId, room } = useParams();

  const sendMsg = async () => {
    try {
      if (!message.trim()) {
        return;
      }

      console.log("Sending message with:", { id, roomId, message });
      const response = await axios.post("http://localhost:3001/send-message", {
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

  const handlelogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 10);
    console.log("successfully logged out");
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight + 100;
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/get-messages/${roomId}/${id}`
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

  useEffect(()=> {
    scrollToBottom();
  }, [messages])

  return (
    <div className=" h-screen w-screen flex flex-col jusitfy-center items-center gap-5 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white">
      <div className=" h-1 w-full flex flex-row justify-between items-center p-10 text-2xl border-b-2 border-b-white font-bold ">
        <div className="">
          <h3>Username: {username}</h3>
          <h3>Room : {room}</h3>
        </div>
        <div className=" rounded bg-opacity-50 bg-white p-4 hover:bg-blue-400 hover:shadow hover:shadow-black hover:shadow-md">
          <Link to={`/room/${username}/${id}`}>
            <button className="create-room">Create Room</button>
          </Link>
        </div>

        <div className=" rounded bg-opacity-50 bg-white p-4 hover:bg-blue-400 hover:shadow hover:shadow-black hover:shadow-md">
          <button onClick={handlelogout}>Logout</button>
        </div>
      </div>

      <div className=" max-h-[80%] min-h-[80%] w-1/3 sm:w-2/3 flex justify-start items-center gap-2 bg-[#292929] shadow shadow-black shadow-lg rounded mb-8 flex-col ">
        <div className="flex-grow flex flex-col gap-4 w-full h-[calc(100%-2rem)] max-h-[calc(100%-4rem)] overflow-auto justify-start p-2 scrollbar scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            ref={messageContainerRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.senderId.toString() === id
                  ? "bg-green-500 px-2 py-2 rounded self-end text-black"
                  : "bg-white px-2 py-2 rounded self-start text-black"
              }
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 h-8 text-black ">
          <input
            className=" rounded px-5 outline-none focus:bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 focus:placeholder-black placeholder-black"
            name="text"
            placeholder="Type something..."
            type="search"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className=" h-full rounded px-3 bg-green-400 text-center ">
            <button
              className=" h-full flex items-center justify-center"
              onClick={sendMsg}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
