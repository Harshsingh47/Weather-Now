import { create } from 'zustand';
import type { WeatherData, ForecastData, HourlyForecastData, CitySuggestion } from '../types';
import { weatherService } from '../services/weatherService';

interface WeatherState {
  currentLocation: CitySuggestion | null;
  currentWeather: WeatherData | null;
  hourlyForecast: HourlyForecastData[];
  dailyForecast: ForecastData[];
  isLoading: boolean;
  error: string | null;
  
  setCurrentLocation: (location: CitySuggestion) => void;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
  fetchWeatherByCityName: (cityName: string) => Promise<void>;
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>;
  refreshWeather: () => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  currentLocation: null,
  currentWeather: null,
  hourlyForecast: [],
  dailyForecast: [],
  isLoading: false,
  error: null,

  setCurrentLocation: (location) => set({ currentLocation: location }),

  fetchWeather: async (lat, lon) => {
    set({ isLoading: true, error: null });
    try {
      const [current, forecast] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon),
        weatherService.getForecast(lat, lon)
      ]);
      
      set({
        currentWeather: current,
        hourlyForecast: forecast.hourly,
        dailyForecast: forecast.daily,
        isLoading: false
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch weather', isLoading: false });
    }
  },

  fetchWeatherByCityName: async (cityName) => {
    set({ isLoading: true, error: null });
    try {
      const cities = await weatherService.searchCities(cityName);
      if (cities.length === 0) {
        throw new Error('City not found');
      }
      const city = cities[0];
      set({ currentLocation: city });
      await get().fetchWeather(city.lat, city.lon);
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch weather', isLoading: false });
    }
  },

  fetchWeatherByLocation: async (lat: number, lon: number) => {
    set({ isLoading: true, error: null });
    try {
      const city = await weatherService.reverseGeocode(lat, lon);
      if (city) {
        set({ currentLocation: city });
      } else {
        // Fallback to coordinates if reverse geocode fails
        set({ 
          currentLocation: { 
            name: 'Local Weather', 
            lat, 
            lon, 
            country: '' 
          } 
        });
      }
      await get().fetchWeather(lat, lon);
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch weather by location', isLoading: false });
    }
  },

  refreshWeather: async () => {
    const loc = get().currentLocation;
    if (loc) {
      await get().fetchWeather(loc.lat, loc.lon);
    }
  }
}));
