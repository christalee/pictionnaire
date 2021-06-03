import {
    io
} from 'socket.io-client';

import './App.css';
import DrawingArea from './components/DrawingArea';

function App() {
    // const socket = io.connect("/");
    const socket = io();
    return (
      <>
      <h1>Pictionnaire</h1>
      <div className = "App drawing-area">
        <DrawingArea socket={socket} />
      </div>
    </>
    );
}

export default App;
