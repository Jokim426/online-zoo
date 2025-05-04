const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/mydb';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to database');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('Database connection error:', err);
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});