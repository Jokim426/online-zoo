import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

interface Animal {
  id: string;
  name: string;
  species: string;
}

interface Interaction {
  animalId: string;
  interactionType: string;
  timestamp: string;
}

interface Enclosure {
  animals: Animal[];
  interactions: Interaction[];
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;
const animalEnclosures: Record<string, Enclosure> = {};

const handleJoinEnclosure = (socket: socketIo.Socket, enclosureId: string) => {
  socket.join(enclosureId);
  if (!animalEnclosures[enclosureId]) {
    animalEnclosures[enclosureId] = {
      animals: [],
      interactions: []
    };
  }
  socket.emit('enclosureData', animalEnclosures[enclosureId]);
};

const handleAnimalInteraction = (socket: socketIo.Socket, enclosureId: string, animalId: string, interactionType: string) => {
  const timestamp = new Date().toISOString();
  const interaction: Interaction = { animalId, interactionType, timestamp };

  if (animalEnclosures[enclosureId]) {
    animalEnclosures[enclosureId].interactions.push(interaction);
    io.to(enclosureId).emit('newInteraction', interaction);
  }
};

const handleAddAnimal = (socket: socketIo.Socket, enclosureId: string, animalData: Animal) => {
  if (animalEnclosures[enclosureId]) {
    animalEnclosures[enclosureId].animals.push(animalData);
    io.to(enclosureId).emit('animalAdded', animalData);
  }
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinEnclosure', (enclosureId) => handleJoinEnclosure(socket, enclosureId));
  socket.on('animalInteraction', ({ enclosureId, animalId, interactionType }) => 
    handleAnimalInteraction(socket, enclosureId, animalId, interactionType));
  socket.on('addAnimal', ({ enclosureId, animalData }) => 
    handleAddAnimal(socket, enclosureId, animalData));
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});