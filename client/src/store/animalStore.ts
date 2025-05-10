
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

const updateCurrentAnimal = (state: AnimalState, updates: Partial<Animal>) => {
  if (!state.currentAnimal) return state;
  return { currentAnimal: { ...state.currentAnimal, ...updates } };
};

const useAnimalStore = create<AnimalState>((set) => ({
  currentAnimal: null,
  animals: [],
  interactions: [],
  feed: () => set((state) => 
    updateCurrentAnimal(state, {
      hunger: Math.max(0, state.currentAnimal!.hunger - 10),
      happiness: Math.min(100, state.currentAnimal!.happiness + 5)
    }))
  ),
  play: () => set((state) => 
    updateCurrentAnimal(state, {
      happiness: Math.min(100, state.currentAnimal!.happiness + 10),
      energy: Math.max(0, state.currentAnimal!.energy - 15)
    }))
  ),
  rest: () => set((state) => 
    updateCurrentAnimal(state, {
      energy: Math.min(100, state.currentAnimal!.energy + 20),
      hunger: Math.min(100, state.currentAnimal!.hunger + 5)
    }))
  ),
  setCurrentAnimal: (animal) => set({ currentAnimal: animal }),
  addInteraction: (interaction) => 
    set((state) => ({ interactions: [...state.interactions, interaction] }))
}));
