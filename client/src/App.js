import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateRoomForm from './pages/Createroomform'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/Login" />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createroom" element={<CreateRoomForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
