import React from 'react';
import './AnimalCard.css';

const AnimalCard = ({ animal }) => {
  return (
    <div className="animal-card">
      <img 
        src={animal.imageUrl} 
        alt={animal.name} 
        className="animal-image"
      />
      <div className="animal-info">
        <h2 className="animal-name">{animal.name}</h2>
        <div className="animal-stats">
          <p><strong>Species:</strong> {animal.species}</p>
          <p><strong>Age:</strong> {animal.age}</p>
          <p><strong>Habitat:</strong> {animal.habitat}</p>
          <p><strong>Diet:</strong> {animal.diet}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;