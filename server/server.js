// https://dev.to/jerrymcdonald/creating-a-shareable-whiteboard-with-canvas-socket-io-and-react-2en

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require("socket.io")
const io = socket(server);
const path = require("path")


const onConnection = (socket) => {
    socket.on('drawing', (data) => {
        console.log("drawing", data);
        socket.broadcast.emit('drawing', data);
    });
}
io.on('connection', onConnection);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "../build/index.html"))
);

const port = 8080;
server.listen(port, () => console.log(`server is running on port ${port}`));