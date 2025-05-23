import { Request, Response } from 'express';
import Animal from '../models/animal';
import User from '../models/user';

const createAnimal = async (req: Request, res: Response) => {
  try {
    const { name, species, traits } = req.body;
    const owner = req.user._id;

    const newAnimal = new Animal({ name, species, traits, owner });
    await newAnimal.save();
    
    await User.findByIdAndUpdate(owner, { $push: { animals: newAnimal._id } });

    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAnimal) return res.status(404).json({ error: 'Animal not found' });

    res.json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const feedAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    animal.hungerLevel = Math.max(0, animal.hungerLevel - 20);
    animal.happiness += 10;
    animal.lastFed = new Date();

    await animal.save();
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const playWithAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    animal.energy = Math.max(0, animal.energy - 15);
    animal.happiness += 20;
    animal.lastPlayed = new Date();

    await animal.save();
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserAnimals = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const animals = await Animal.find({ owner: userId });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnimalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createAnimal,
  updateAnimal,
  feedAnimal,
  playWithAnimal,
  getUserAnimals,
  getAnimalById
};