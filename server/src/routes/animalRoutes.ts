const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// Create a new animal
router.post('/', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific animal
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an animal
router.patch('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an animal
router.delete('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json({ message: 'Animal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Custom interaction endpoint
router.post('/:id/interact', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    // Example interaction logic
    animal.interactions.push({
      type: req.body.action,
      timestamp: new Date()
    });

    await animal.save();
    res.json(animal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;