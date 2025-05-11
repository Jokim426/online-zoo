import { useState } from 'react';

interface Enclosure {
  id: string;
  name: string;
  animals: string[];
  description?: string;
  image?: string;
}

interface ZooMapProps {
  enclosures: Enclosure[];
}

const ZooMap = ({ enclosures }: ZooMapProps) => {
  const [selectedEnclosure, setSelectedEnclosure] = useState<Enclosure | null>(null);
  const [currentView, setCurrentView] = useState<'map' | 'detail'>('map');

  const handleEnclosureClick = (enclosure: Enclosure) => {
    setSelectedEnclosure(enclosure);
    setCurrentView('detail');
  };

  const handleBackClick = () => {
    setCurrentView('map');
    setSelectedEnclosure(null);
  };

  const renderMapView = () => (
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
            <div className="enclosure-animals">{enclosure.animals.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetailView = () => {
    if (!selectedEnclosure) return null;

    return (
      <div className="detail-view">
        <button onClick={handleBackClick} className="back-button">
          ← Back to Map
        </button>
        <h2>{selectedEnclosure.name}</h2>
        <p>Animals: {selectedEnclosure.animals.join(', ')}</p>
        {selectedEnclosure.description && <p>{selectedEnclosure.description}</p>}
        {selectedEnclosure.image && (
          <img
            src={selectedEnclosure.image}
            alt={selectedEnclosure.name}
            className="enclosure-image"
          />
        )}
      </div>
    );
  };

  return (
    <div className="zoo-map-container">
      {currentView === 'map' ? renderMapView() : renderDetailView()}
    </div>
  );
};

export default ZooMap;