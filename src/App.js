import Home from "./pages/home/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import {useState} from 'react'
import io from 'socket.io-client'
import Chat from "./pages/chat/Chat";
// where we are connecting out socket to the server
const socket = io.connect('http://localhost:4000');

function App() {
const [username, setUsername] = useState('')
const [topic, setTopic] = useState('')

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home
        username={username}
        setUsername={setUsername}
        topic={topic}
        setTopic={setTopic}
        socket={socket} /> }

        />   
        <Route path="/chat" element={<Chat username={username} topic={topic} socket={socket}/>} />
      </Routes>
    </Router>  
    </div>
  );
}

export default App;
