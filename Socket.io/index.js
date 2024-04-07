// SOCKET FOR SERVER
// Send event to client use:    io
// to send every client use:    io.emit
// to send one client use:      io.to(socketId).emit
// Take event from client use:  socket.on

// SOCKET FOR CLIENT
// Send event to server use:    socket.emit
// Take event from server use:  socket.on

//================= index.js ===================//
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5010, ()=>{
    console.log("Server is running at port: http://localhost:5010");
})
