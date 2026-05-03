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
  rawDate: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
}

export interface HourlyForecastData {
  time: string;
  dateStr: string;
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
