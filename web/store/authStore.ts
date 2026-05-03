import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
  goal?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('nutriai_token', token);
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem('nutriai_token');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'nutriai-auth',
    }
  )
);
