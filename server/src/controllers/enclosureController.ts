const Enclosure = require('../models/enclosure');
const Animal = require('../models/animal');

exports.createEnclosure = async (req, res) => {
  try {
    const { name, capacity, type } = req.body;
    const enclosure = new Enclosure({ name, capacity, type });
    await enclosure.save();
    res.status(201).json(enclosure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEnclosures = async (req, res) => {
  try {
    const enclosures = await Enclosure.find().populate('animals');
    res.json(enclosures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEnclosureById = async (req, res) => {
  try {
    const enclosure = await Enclosure.findById(req.params.id).populate('animals');
    if (!enclosure) {
      return res.status(404).json({ error: 'Enclosure not found' });
    }
    res.json(enclosure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEnclosure = async (req, res) => {
  try {
    const enclosure = await Enclosure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!enclosure) {
      return res.status(404).json({ error: 'Enclosure not found' });
    }
    res.json(enclosure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEnclosure = async (req, res) => {
  try {
    const enclosure = await Enclosure.findByIdAndDelete(req.params.id);
    if (!enclosure) {
      return res.status(404).json({ error: 'Enclosure not found' });
    }
    await Animal.updateMany(
      { enclosure: enclosure._id },
      { $unset: { enclosure: 1 } }
    );
    res.json({ message: 'Enclosure deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVisibleAnimals = async (req, res) => {
  try {
    const { healthThreshold = 50, strengthThreshold = 50 } = req.query;
    const animals = await Animal.find({
      health: { $gte: healthThreshold },
      strength: { $gte: strengthThreshold }
    }).populate('enclosure');
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAnimalToEnclosure = async (req, res) => {
  try {
    const { animalId } = req.body;
    const enclosure = await Enclosure.findById(req.params.id);
    const animal = await Animal.findById(animalId);

    if (!enclosure || !animal) {
      return res.status(404).json({ error: 'Enclosure or Animal not found' });
    }

    if (enclosure.animals.length >= enclosure.capacity) {
      return res.status(400).json({ error: 'Enclosure at full capacity' });
    }

    enclosure.animals.push(animalId);
    animal.enclosure = enclosure._id;
    
    await enclosure.save();
    await animal.save();
    
    res.json(enclosure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeAnimalFromEnclosure = async (req, res) => {
  try {
    const { animalId } = req.params;
    const enclosure = await Enclosure.findById(req.params.id);
    const animal = await Animal.findById(animalId);

    if (!enclosure || !animal) {
      return res.status(404).json({ error: 'Enclosure or Animal not found' });
    }

    enclosure.animals = enclosure.animals.filter(id => id.toString() !== animalId);
    animal.enclosure = undefined;
    
    await enclosure.save();
    await animal.save();
    
    res.json(enclosure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};