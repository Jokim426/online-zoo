import { create } from 'zustand';

type Animal = {
  id: string;
  name: string;
  species: string;
  happiness: number;
  hunger: number;
  energy: number;
};

type AnimalState = {
  currentAnimal: Animal | null;
  animals: Animal[];
  interactions: string[];
  feed: () => void;
  play: () => void;
  rest: () => void;
  setCurrentAnimal: (animal: Animal) => void;
  addInteraction: (interaction: string) => void;
};

const useAnimalStore = create<AnimalState>((set) => ({
  currentAnimal: null,
  animals: [],
  interactions: [],
  feed: () => set((state) => {
    if (!state.currentAnimal) return state;
    return {
      currentAnimal: {
        ...state.currentAnimal,
        hunger: Math.max(0, state.currentAnimal.hunger - 10),
        happiness: Math.min(100, state.currentAnimal.happiness + 5)
      }
    };
  }),
  play: () => set((state) => {
    if (!state.currentAnimal) return state;
    return {
      currentAnimal: {
        ...state.currentAnimal,
        happiness: Math.min(100, state.currentAnimal.happiness + 10),
        energy: Math.max(0, state.currentAnimal.energy - 15)
      }
    };
  }),
  rest: () => set((state) => {
    if (!state.currentAnimal) return state;
    return {
      currentAnimal: {
        ...state.currentAnimal,
        energy: Math.min(100, state.currentAnimal.energy + 20),
        hunger: Math.min(100, state.currentAnimal.hunger + 5)
      }
    };
  }),
  setCurrentAnimal: (animal) => set({ currentAnimal: animal }),
  addInteraction: (interaction) => 
    set((state) => ({ interactions: [...state.interactions, interaction] }))
}));

export default useAnimalStore;