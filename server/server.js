// https://dev.to/jerrymcdonald/creating-a-shareable-whiteboard-with-canvas-socket-io-and-react-2en

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "../build/index.html"))
);

const onConnection = (socket) => {
  console.log('client connected: ', socket.id);
  socket.emit("connection", socket.id);
  io.emit("io_connection", socket.id);
    socket.on('drawing', (data) => {
        console.log("server drawing", data);
        io.emit('drawing', data);
    });
    socket.on('chat', (data) => {
      console.log('chat', data);
      io.emit('chat', data);
    })
}
io.on('connection', onConnection);

const port = 8080;
server.listen(port, () => console.log(`server is running on port ${port}`));
