const Animal = require('../models/animal');

const handleErrorResponse = (res, statusCode, error) => {
  res.status(statusCode).json({ error: error.message });
};

const validateEnclosureExists = (enclosure, res) => {
  if (!enclosure) {
    res.status(404).json({ error: 'Enclosure not found' });
    return false;
  }
  return true;
};

const validateAnimalAndEnclosureExist = (enclosure, animal, res) => {
  if (!enclosure || !animal) {
    res.status(404).json({ error: 'Enclosure or Animal not found' });
    return false;
  }
  return true;
};

exports.createEnclosure = async (req, res) => {
  try {
    const { name, capacity, type } = req.body;
    const enclosure = new Enclosure({ name, capacity, type });
    await enclosure.save();
    res.status(201).json(enclosure);
  } catch (error) {
    handleErrorResponse(res, 400, error);
  }
};

exports.getAllEnclosures = async (req, res) => {
  try {
    const enclosures = await Enclosure.find().populate('animals');
    res.json(enclosures);
  } catch (error) {
    handleErrorResponse(res, 500, error);
  }
};

exports.getEnclosureById = async (req, res) => {
  try {
    const enclosure = await Enclosure.findById(req.params.id).populate('animals');
    if (!validateEnclosureExists(enclosure, res)) return;
    res.json(enclosure);
  } catch (error) {
    handleErrorResponse(res, 500, error);
  }
};

exports.updateEnclosure = async (req, res) => {
  try {
    const enclosure = await Enclosure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!validateEnclosureExists(enclosure, res)) return;
    res.json(enclosure);
  } catch (error) {
    handleErrorResponse(res, 400, error);
  }
};

exports.deleteEnclosure = async (req, res) => {
  try {
    const enclosure = await Enclosure.findByIdAndDelete(req.params.id);
    if (!validateEnclosureExists(enclosure, res)) return;
    
    await Animal.updateMany(
      { enclosure: enclosure._id },
      { $unset: { enclosure: 1 } }
    );
    
    res.json({ message: 'Enclosure deleted successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error);
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
    handleErrorResponse(res, 500, error);
  }
};

exports.addAnimalToEnclosure = async (req, res) => {
  try {
    const { animalId } = req.body;
    const [enclosure, animal] = await Promise.all([
      Enclosure.findById(req.params.id),
      Animal.findById(animalId)
    ]);

    if (!validateAnimalAndEnclosureExist(enclosure, animal, res)) return;

    if (enclosure.animals.length >= enclosure.capacity) {
      return res.status(400).json({ error: 'Enclosure at full capacity' });
    }

    enclosure.animals.push(animalId);
    animal.enclosure = enclosure._id;
    
    await Promise.all([enclosure.save(), animal.save()]);
    
    res.json(enclosure);
  } catch (error) {
    handleErrorResponse(res, 400, error);
  }
};

exports.removeAnimalFromEnclosure = async (req, res) => {
  try {
    const { animalId } = req.params;
    const [enclosure, animal] = await Promise.all([
      Enclosure.findById(req.params.id),
      Animal.findById(animalId)
    ]);

    if (!validateAnimalAndEnclosureExist(enclosure, animal, res)) return;

    enclosure.animals = enclosure.animals.filter(id => id.toString() !== animalId);
    animal.enclosure = undefined;
    
    await Promise.all([enclosure.save(), animal.save()]);
    
    res.json(enclosure);
  } catch (error) {
    handleErrorResponse(res, 400, error);
  }
};