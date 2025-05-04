const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

const animalEnclosures = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinEnclosure', (enclosureId) => {
    socket.join(enclosureId);
    if (!animalEnclosures[enclosureId]) {
      animalEnclosures[enclosureId] = {
        animals: [],
        interactions: []
      };
    }
    socket.emit('enclosureData', animalEnclosures[enclosureId]);
  });

  socket.on('animalInteraction', ({ enclosureId, animalId, interactionType }) => {
    const timestamp = new Date().toISOString();
    const interaction = { animalId, interactionType, timestamp };
    
    if (animalEnclosures[enclosureId]) {
      animalEnclosures[enclosureId].interactions.push(interaction);
      io.to(enclosureId).emit('newInteraction', interaction);
    }
  });

  socket.on('addAnimal', ({ enclosureId, animalData }) => {
    if (animalEnclosures[enclosureId]) {
      animalEnclosures[enclosureId].animals.push(animalData);
      io.to(enclosureId).emit('animalAdded', animalData);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});