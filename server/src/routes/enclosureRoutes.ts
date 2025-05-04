const express = require('express');
const router = express.Router();
const Enclosure = require('../models/enclosure');
const Animal = require('../models/animal');

router.get('/', async (req, res) => {
  try {
    const enclosures = await Enclosure.find().populate('animals');
    res.json(enclosures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const enclosure = await Enclosure.findById(req.params.id).populate('animals');
    if (!enclosure) return res.status(404).json({ message: 'Enclosure not found' });
    res.json(enclosure);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/animals', async (req, res) => {
  try {
    const enclosure = await Enclosure.findById(req.params.id);
    if (!enclosure) return res.status(404).json({ message: 'Enclosure not found' });

    const animal = new Animal(req.body);
    await animal.save();

    enclosure.animals.push(animal);
    await enclosure.save();

    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id/animals/:animalId', async (req, res) => {
  try {
    const enclosure = await Enclosure.findById(req.params.id);
    if (!enclosure) return res.status(404).json({ message: 'Enclosure not found' });

    enclosure.animals.pull(req.params.animalId);
    await enclosure.save();

    await Animal.findByIdAndDelete(req.params.animalId);

    res.json({ message: 'Animal removed from enclosure' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;