import React, { useState } from 'react';
import './ZooMap.css';

const ZooMap = ({ enclosures }) => {
  const [selectedEnclosure, setSelectedEnclosure] = useState(null);
  const [currentView, setCurrentView] = useState('map');

  const handleEnclosureClick = (enclosure) => {
    setSelectedEnclosure(enclosure);
    setCurrentView('detail');
  };

  const handleBackClick = () => {
    setCurrentView('map');
    setSelectedEnclosure(null);
  };

  return (
    <div className="zoo-map-container">
      {currentView === 'map' ? (
        <div className="map-view">
          <h2>Zoo Map</h2>
          <div className="enclosures-grid">
            {enclosures.map((enclosure) => (
              <div
                key={enclosure.id}
                className="enclosure"
                onClick={() => handleEnclosureClick(enclosure)}
              >
                <div className="enclosure-name">{enclosure.name}</div>
                <div className="enclosure-animals">
                  {enclosure.animals.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="detail-view">
          <button onClick={handleBackClick} className="back-button">
            ← Back to Map
          </button>
          <h2>{selectedEnclosure.name}</h2>
          <p>Animals: {selectedEnclosure.animals.join(', ')}</p>
          <p>{selectedEnclosure.description}</p>
          <img
            src={selectedEnclosure.image}
            alt={selectedEnclosure.name}
            className="enclosure-image"
          />
        </div>
      )}
    </div>
  );
};

export default ZooMap;