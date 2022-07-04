exports.joinRoom = (socket, data) => {
  socket.join(data);
  console.log(`User with id ${socket.id} joined room ${data}`);
}

exports.sendMessage = (socket, data) => {
  socket.to(data.room).emit("receive_message", data);
}
