const express = require("express");
const socket = require("socket.io");

const app = express();
const port = process.env.PORT || 5000;

// Do this since app.listen will return an instance of http.Server
//  not the Express instance
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", socket => {
  console.log(`got a socket connection with id: ${socket.id}`);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    // emit message to all others, but not the current one
    socket.broadcast.emit("typing", data);
  });
});
