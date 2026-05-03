import axios from 'axios';
import { get, set } from 'idb-keyval';
import type { WeatherData, ForecastData, HourlyForecastData, CitySuggestion } from '../types';
import { format, parseISO } from 'date-fns';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const getCacheKey = (type: string, lat: number, lon: number) => `v2_${type}_${lat}_${lon}`;

interface CacheWrapper<T> {
  data: T;
  timestamp: number;
}

async function fetchWithCache<T>(cacheKey: string, fetchFn: () => Promise<T>): Promise<T> {
  try {
    const cached = await get<CacheWrapper<T>>(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  } catch (e) {
    console.error('Cache read error', e);
  }

  const data = await fetchFn();

  try {
    await set(cacheKey, { data, timestamp: Date.now() });
  } catch (e) {
    console.error('Cache write error', e);
  }

  return data;
}

export const weatherService = {
  searchCities: async (query: string): Promise<CitySuggestion[]> => {
    if (!query) return [];
    try {
      const response = await axios.get(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
      return response.data.map((item: any) => ({
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
        state: item.state,
      }));
    } catch (error) {
      console.error('Failed to search cities', error);
      return [];
    }
  },

  reverseGeocode: async (lat: number, lon: number): Promise<CitySuggestion | null> => {
    try {
      const response = await axios.get(`${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      if (response.data && response.data.length > 0) {
        const item = response.data[0];
        return {
          name: item.name,
          lat: item.lat,
          lon: item.lon,
          country: item.country,
          state: item.state,
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to reverse geocode', error);
      return null;
    }
  },

  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    const cacheKey = getCacheKey('current', lat, lon);
    return fetchWithCache(cacheKey, async () => {
      const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const data = response.data;
      return {
        id: data.id.toString(),
        city: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        uvIndex: 0, // OpenWeatherMap current weather doesn't include UV by default without OneCall, keeping as 0 or could fetch separately if needed
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        timestamp: data.dt * 1000,
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
    });
  },

  getForecast: async (lat: number, lon: number): Promise<{ hourly: HourlyForecastData[]; daily: ForecastData[] }> => {
    const cacheKey = getCacheKey('forecast', lat, lon);
    return fetchWithCache(cacheKey, async () => {
      const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const list = response.data.list;

      const hourly: HourlyForecastData[] = list.map((item: any) => ({
        time: format(new Date(item.dt * 1000), 'h a'),
        dateStr: format(new Date(item.dt * 1000), 'yyyy-MM-dd'),
        temperature: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      }));

      const dailyMap = new Map<string, any>();
      list.forEach((item: any) => {
        const dateStr = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
        if (!dailyMap.has(dateStr)) {
          dailyMap.set(dateStr, {
            date: dateStr,
            rawDate: dateStr,
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            pressure: item.main.pressure,
            visibility: item.visibility,
          });
        } else {
          const current = dailyMap.get(dateStr);
          current.minTemp = Math.min(current.minTemp, item.main.temp_min);
          current.maxTemp = Math.max(current.maxTemp, item.main.temp_max);
        }
      });

      const daily: ForecastData[] = Array.from(dailyMap.values()).slice(0, 7).map(item => ({
        ...item,
        date: format(parseISO(item.date), 'EEE, MMM d')
      }));

      return { hourly, daily };
    });
  },
  
  getWeatherByCity: async (city: string) => {
    const cities = await weatherService.searchCities(city);
    if (cities.length > 0) {
      const { lat, lon } = cities[0];
      return weatherService.getCurrentWeather(lat, lon);
    }
    throw new Error('City not found');
  }
};
