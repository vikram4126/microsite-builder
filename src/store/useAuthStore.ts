import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  avatar: string;
  role?: 'guest' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  isAuthenticated: !!localStorage.getItem('auth_user'),
  login: (user) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },
  loginAsGuest: () => {
    const guestUser: User = {
      id: 'guest',
      name: 'Guest User',
      email: '',
      plan: 'free',
      avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=1e49e2&color=fff',
      role: 'guest'
    };
    localStorage.setItem('auth_user', JSON.stringify(guestUser));
    set({ user: guestUser, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth_user');
    set({ user: null, isAuthenticated: false });
  },
}));
