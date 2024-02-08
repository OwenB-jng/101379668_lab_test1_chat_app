// Owen Beattie 101379668 LabTest1 Chat App 3133
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const SERVER_PORT = process.env.PORT || 3000;
const app = express();

/*
const mongoose = require('mongoose');

// Replace '<your_connection_string>' with your actual MongoDB connection string
const MONGODB_URI = '<your_connection_string>';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

*/

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user has connected', socket.id);
  socket.emit('message', 'Welcome to the chat room');

  socket.on('message', (message) => {
    console.log('Server:', message);
  });

  socket.on('chat', (data) => {
    io.emit('new_chat_message', data);
    console.log(data);
  });

  socket.on('join_group', (data) => {
    socket.join(data.group_name);
    console.log(`User ${data.senderID} joined group: ${data.group_name}`);
  });

  socket.on('leave_group', (data) => {
    socket.leave(data.group_name);
    console.log(`User ${data.senderID} left group: ${data.group_name}`);
  });

  socket.on('group_message', (data) => {
    io.to(data.group_name).emit('new_group_message', data);
    console.log(data);
  });
});
