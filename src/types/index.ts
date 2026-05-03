export interface WeatherData {
  id: string;
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  condition: string;
  icon: string;
  timestamp: number;
  lat: number;
  lon: number;
}

export interface ForecastData {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}

export interface HourlyForecastData {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface UserSettings {
  unit: 'CELSIUS' | 'FAHRENHEIT';
  theme: 'LIGHT' | 'DARK';
  notifications: boolean;
}

export interface CitySuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
