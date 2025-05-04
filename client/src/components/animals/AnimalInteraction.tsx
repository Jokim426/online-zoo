import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AnimalInteraction = ({ animalId }) => {
  const [animal, setAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`/api/animals/${animalId}`);
        setAnimal(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching animal:', error);
        setIsLoading(false);
      }
    };
    fetchAnimal();
  }, [animalId]);

  const handleAction = async (actionType) => {
    setAction(actionType);
    try {
      const response = await axios.post(`/api/animals/${animalId}/interact`, {
        action: actionType
      });
      setAnimal(response.data.updatedAnimal);
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error performing action:', error);
      setMessage('Action failed');
      setTimeout(() => setMessage(''), 3000);
    }
    setTimeout(() => setAction(null), 1000);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!animal) return <div>Animal not found</div>;

  return (
    <div className="animal-interaction">
      <motion.div
        className="animal-display"
        animate={{
          scale: action === 'play' ? [1, 1.1, 1] : 1,
          rotate: action === 'feed' ? [0, 5, -5, 0] : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={animal.image} 
          alt={animal.name} 
          style={{ width: '200px', height: '200px' }}
        />
        <h2>{animal.name}</h2>
        <p>Happiness: {animal.happiness}</p>
        <p>Hunger: {animal.hunger}</p>
      </motion.div>

      <div className="action-buttons">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction('feed')}
        >
          Feed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction('play')}
        >
          Play
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction('pet')}
        >
          Pet
        </motion.button>
      </div>

      {message && (
        <motion.div
          className="message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
};

export default AnimalInteraction;