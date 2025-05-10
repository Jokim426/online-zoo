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

  const renderMapView = () => (
    <div className="map-view">
      <h2>Zoo Map</h2>
      <div className="enclosures-grid">
        {enclosures.map(({ id, name, animals }) => (
          <div
            key={id}
            className="enclosure"
            onClick={() => handleEnclosureClick({ id, name, animals })}
          >
            <div className="enclosure-name">{name}</div>
            <div className="enclosure-animals">{animals.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetailView = () => (
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
  );

  return (
    <div className="zoo-map-container">
      {currentView === 'map' ? renderMapView() : renderDetailView()}
    </div>
  );
};

export default ZooMap;