import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings, CitySuggestion } from '../types';

interface SettingsState extends UserSettings {
  favorites: CitySuggestion[];
  setUnit: (unit: UserSettings['unit']) => void;
  setTheme: (theme: UserSettings['theme']) => void;
  setNotifications: (notifications: boolean) => void;
  addFavorite: (city: CitySuggestion) => void;
  removeFavorite: (cityName: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      unit: 'CELSIUS',
      theme: 'LIGHT',
      notifications: false,
      favorites: [],
      setUnit: (unit) => set({ unit }),
      setTheme: (theme) => set({ theme }),
      setNotifications: (notifications) => set({ notifications }),
      addFavorite: (city) =>
        set((state) => ({
          favorites: [...state.favorites, city],
        })),
      removeFavorite: (cityName) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.name !== cityName),
        })),
    }),
    {
      name: 'weathernow-settings',
    }
  )
);
