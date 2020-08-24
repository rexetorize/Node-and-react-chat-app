const express = require("express");
const socket = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;
const homeRouter = require("./routes/home");

//some basic functions to perform some operations
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./functions.js");

const server = app.listen(PORT, () => {
  console.log("LISTENING TO PORT 5000");
});

app.use("/", homeRouter);

const io = socket(server);

//On connection To the clent
io.on("connection", (socket) => {
  console.log("A user has connected");

  //we have to join a room, hence the socket.on('join', func())
  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    //joining to a particular room, the name is recieved from the front end!
    socket.join(user.room);

    //on joing the room emitting a msg for the user who just joined the room!
    socket.emit("message", { name: name, text: `Welcome to the room!` });

    //emitting a msg to all the people in the room that a user has joined
    socket.broadcast.to(user.room).emit("message", {
      name: name,
      text: `${user.name} has joined the room!`,
    });

    //to send the room data, i.e. how many people in the room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  //recieving a msg from the clent
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    //emitting that msg to all the users in the room
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  // I was trying to implent the typing... function for a better ux
  // socket.on("typing", { user: user.name });

  //when a user leaves
  socket.on("disconnect", () => {
    console.log("A user has disconnected");
    const user = removeUser(socket.id);

    if (user) {
      //emitting  a msg that the user has left
      io.to(user.room).emit("message", {
        text: `${user.name} has left`,
      });
      //also sending new room data that a has 1 user less
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
