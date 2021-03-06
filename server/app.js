const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');

app.use(cors());
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const {joinRoom, sendMessage} = require("./helpers/socketFunc");

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    joinRoom(socket, data);
  });

  socket.on("send_message", (data) => {
    sendMessage(socket, data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
  });
});


server.listen(3001, () => {
  console.log("Server is running...");
});
