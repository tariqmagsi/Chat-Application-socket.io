const express = require("express");
const socket = require("socket.io");

const app = express();

const port = process.env.PORT;

app.use(express.json());

const server = app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const io = socket(server);

io.on("connection", socket => {
  // console.log("made socket connection " + socket.id);
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
