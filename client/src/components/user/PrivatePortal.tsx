import React, { useState, useEffect } from 'react';

const AnimalTrainingPortal = () => {
  const [animal, setAnimal] = useState({
    name: 'Fluffy',
    type: 'Dog',
    level: 1,
    experience: 0,
    strength: 5,
    agility: 5,
    intelligence: 5,
    happiness: 100,
    energy: 100,
    lastTrained: null
  });

  const [trainingLog, setTrainingLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const trainStat = (stat) => {
    if (animal.energy < 20) {
      alert('Not enough energy to train!');
      return;
    }

    setIsLoading(true);
    
    const statIncrease = Math.floor(Math.random() * 3) + 1;
    const xpGain = Math.floor(Math.random() * 10) + 5;
    const happinessChange = Math.floor(Math.random() * 5) - 2;
    
    setAnimal(prev => {
      const newLevel = prev.experience + xpGain >= prev.level * 100 
        ? prev.level + 1 
        : prev.level;
      
      return {
        ...prev,
        [stat]: prev[stat] + statIncrease,
        experience: newLevel > prev.level ? 0 : prev.experience + xpGain,
        level: newLevel,
        happiness: Math.max(0, Math.min(100, prev.happiness + happinessChange)),
        energy: Math.max(0, prev.energy - 20),
        lastTrained: new Date().toISOString()
      };
    });

    setTrainingLog(prev => [
      ...prev,
      {
        date: new Date().toISOString(),
        action: `Trained ${stat}`,
        statIncrease,
        xpGain
      }
    ]);

    setTimeout(() => setIsLoading(false), 1000);
  };

  const restAnimal = () => {
    setAnimal(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 30),
      happiness: Math.min(100, prev.happiness + 10)
    }));
  };

  const feedAnimal = () => {
    setAnimal(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 10),
      happiness: Math.min(100, prev.happiness + 5)
    }));
  };

  return (
    <div className="animal-portal">
      <h1>{animal.name}'s Training Portal</h1>
      <div className="animal-stats">
        <h2>Stats</h2>
        <p>Level: {animal.level}</p>
        <p>XP: {animal.experience}/{animal.level * 100}</p>
        <p>Strength: {animal.strength}</p>
        <p>Agility: {animal.agility}</p>
        <p>Intelligence: {animal.intelligence}</p>
        <p>Happiness: {animal.happiness}</p>
        <p>Energy: {animal.energy}</p>
      </div>

      <div className="training-actions">
        <h2>Training</h2>
        <button 
          onClick={() => trainStat('strength')} 
          disabled={isLoading || animal.energy < 20}
        >
          {isLoading ? 'Training...' : 'Train Strength'}
        </button>
        <button 
          onClick={() => trainStat('agility')} 
          disabled={isLoading || animal.energy < 20}
        >
          {isLoading ? 'Training...' : 'Train Agility'}
        </button>
        <button 
          onClick={() => trainStat('intelligence')} 
          disabled={isLoading || animal.energy < 20}
        >
          {isLoading ? 'Training...' : 'Train Intelligence'}
        </button>
      </div>

      <div className="care-actions">
        <h2>Care</h2>
        <button onClick={restAnimal}>Rest</button>
        <button onClick={feedAnimal}>Feed</button>
      </div>

      <div className="training-log">
        <h2>Training Log</h2>
        <ul>
          {trainingLog.slice().reverse().map((log, index) => (
            <li key={index}>
              {new Date(log.date).toLocaleString()}: {log.action} (+{log.statIncrease} stat, +{log.xpGain} XP)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimalTrainingPortal;