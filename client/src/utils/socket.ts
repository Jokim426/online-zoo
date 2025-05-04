const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('animalInteraction', (data) => {
  console.log('Received animal interaction:', data);
  updateEnclosureUI(data);
});

function sendInteraction(interactionData) {
  socket.emit('animalInteraction', interactionData);
}

function updateEnclosureUI(interaction) {
  const enclosureElement = document.getElementById(`enclosure-${interaction.enclosureId}`);
  if (enclosureElement) {
    const interactionElement = document.createElement('div');
    interactionElement.className = 'interaction-event';
    interactionElement.textContent = `${interaction.animalId}: ${interaction.type}`;
    enclosureElement.appendChild(interactionElement);
  }
}

// Example usage:
// sendInteraction({
//   enclosureId: 'lion-1',
//   animalId: 'simba',
//   type: 'feeding',
//   timestamp: new Date().toISOString()
// });