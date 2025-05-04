import { create } from 'zustand';

interface AuthState {
  user: null | {
    id: string;
    email: string;
    name: string;
  };
  token: null | string;
  loading: boolean;
  error: null | string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      set({ 
        user: data.user, 
        token: data.token, 
        loading: false 
      });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Login failed',
        loading: false 
      });
    }
  },
  logout: () => {
    set({ 
      user: null, 
      token: null 
    });
  },
  clearError: () => {
    set({ error: null });
  },
}));