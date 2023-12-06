import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from './pages/Chat'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Room from './pages/Room';
import { UserProvider } from './components/Usercontext';

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Chat/:username/:id/:room/:roomId" element={<Chat />} />
        <Route path="/Room/:username/:id" element={<Room />} />
        <Route path="/Room" element={<Room />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
