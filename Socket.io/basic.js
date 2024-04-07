// SERVER
// npm i socket.io
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {cors: {});
// io.on("connection", (socket) => {})

// CLIENT
// npm i socket.io-client
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:5010");
// socket.emit("Name", data);

// SERVER
// Sending event to client:     io
// Sending event every client:  io.emit
// Sending one client:          io.to(socketId).emit
// Get event from client:       socket.on

// CLIENT
// Sending event to server:     socket.emit
// Get event from server:       socket.on

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
