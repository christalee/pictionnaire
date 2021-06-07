import {
    io
} from 'socket.io-client';

import './App.css';
import DrawingArea from './components/DrawingArea';
import Chat from './components/Chat';

function App() {
    const socket = io();
    socket.on("connection", (data) => console.log("socket_connection", data));
    socket.on("io_connection", (data) => console.log("io_connection", data));

    return (
      <>
      <h1>Pictionnaire</h1>
      <div className = "App">
      <div className="drawing-area">
        <DrawingArea socket={socket} />
      </div>
      <div className="chat">
        <Chat socket={socket} />
      </div>
      </div>
      </>
    );
}

export default App;
