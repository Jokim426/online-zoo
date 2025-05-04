import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AnimalEnclosure = () => {
  const [animals, setAnimals] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('animalsUpdate', (data) => {
      setAnimals(data);
    });

    return () => newSocket.close();
  }, []);

  const handleFeed = (animalId) => {
    socket.emit('feedAnimal', animalId);
  };

  const handlePet = (animalId) => {
    socket.emit('petAnimal', animalId);
  };

  return (
    <div className="enclosure">
      <h1>Animal Enclosure</h1>
      <div className="animals-container">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-card">
            <h2>{animal.name}</h2>
            <p>Species: {animal.species}</p>
            <p>Status: {animal.status}</p>
            <div className="animal-actions">
              <button onClick={() => handleFeed(animal.id)}>Feed</button>
              <button onClick={() => handlePet(animal.id)}>Pet</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalEnclosure;