import React from "react";
import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      if (!username || !password) {
        setError("Please fill in all fields.");
        setShowErrorPopup(true);
        return;
      }

      const response = await axios.post("http://localhost:3001/signup", {
        username,
        password,
      });
      console.log("user created successfully:", response.data);
      setTimeout(() => {
        navigate("/login");
      }, 10);
    } catch (error) {
      console.log("user creation failed:", error);
      setError("User creation failed.");
      setShowErrorPopup(true);
    }
  };

  const closeErrorPopup = () => {
    console.log("close popup");
    setShowErrorPopup(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white text-2xl text-center">
      <div  className=" flex flex-col gap-5 justify-center items-center">
        <h1 className="font-bold text-5xl">Signup</h1>
        <div className="flex flex-col gap-2">
          <input
            className="px-5 outline-none rounded text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          ></input>
          <input
            className="px-5 outline-none rounded text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          ></input>
          <div className=" rounded bg-opacity-50 bg-white py-1 hover:bg-blue-400 hover:shadow hover:shadow-black hover:shadow-md text-center">
            <button className="login-btn" onClick={createUser}>
              Signup
            </button>
          </div>
        </div>
        <div className=" absolute bottom-40">
          <p>Already have an Account?{" "}</p>
          <Link to={"/Login"}>
              <button className="hover:border-b-2 border-b-blue-600 hover:font-bold" >Login</button>
          </Link>
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

export default Signup;
