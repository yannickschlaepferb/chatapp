import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../components/Usercontext";
import ErrorPopup from "../components/ErrorPopup";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();
  const { login, setUserId } = useUser();

  const handlelogin = async () => {
    try {
      if (!username || !password) {
        setError("Please fill in all fields");
        setShowErrorPopup(true);
        return;
      }
      const response = await axios.post(
        "http://localhost:3001/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("login successful:", response.data);
        const { userId } = response.data;
        login();
        setUserId(userId);
        navigate(`/room/${username}/${userId}`);
      } else {
        setError("Invalid username or password");
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed");
      setShowErrorPopup(true);
    }
  };

  const closeErrorPopup = () => {
    console.log("close popup");
    setShowErrorPopup(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white text-2xl text-center">
      <div className=" flex flex-col gap-5">
        <div className="font-bold text-5xl">Login</div>
        <div className="flex flex-col gap-2 rounded  ">
          <input
            className="px-5 outline-none rounded text-black "
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handlelogin()}
            placeholder="Enter Username"
          />
          <input
            className="px-5 outline-none rounded text-black "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handlelogin()}
            placeholder="Enter Password"
          />
          <div className=" rounded bg-opacity-50 bg-white py-1 hover:bg-blue-400 hover:shadow hover:shadow-black hover:shadow-md">
            <button onClick={handlelogin} className="login-btn">
              log in
            </button>
          </div>
        </div>
      </div>
      <div className=" absolute bottom-40">
        <p>Don't have an account?{" "}</p>
        <Link to={"/Signup"}>
            <button className="hover:border-b-2 border-b-blue-600 hover:font-bold" >Register</button>
        </Link>
      </div>
      <div>
        {showErrorPopup && (
          <ErrorPopup message={error} onClose={closeErrorPopup} />
        )}
      </div>
    </div>
  );
}

export default Login;
