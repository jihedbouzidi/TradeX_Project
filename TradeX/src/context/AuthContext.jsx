import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  AddPublication: async () => {},
  addToPanier: async () => {},
  deletePublication: async () => {},
  updatePublication: async () => {},
  getUserPublications: async () => {},
  
});