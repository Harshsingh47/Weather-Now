import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { formatTemperature, getWeatherIconUrl } from '../utils/formatters';
import { MapPin } from 'lucide-react';

export const WeatherCard: React.FC = () => {
  const { currentWeather } = useWeatherStore();
  const { unit } = useSettingsStore();

  if (!currentWeather) return null;

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-12 text-white">
      <div className="flex items-center gap-2 mb-2 bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-md">
        <MapPin size={16} />
        <h2 className="text-lg font-medium">{currentWeather.city}</h2>
      </div>
      
      <div className="flex flex-col items-center mt-4">
        <img 
          src={getWeatherIconUrl(currentWeather.icon)} 
          alt={currentWeather.condition}
          className="w-32 h-32 drop-shadow-lg -mb-4"
        />
        <h1 className="sr-only">Live Local Weather Forecast for {currentWeather.city}</h1>
        <div className="text-7xl font-light tracking-tighter drop-shadow-md">
          {formatTemperature(currentWeather.temperature, unit)}
        </div>
        <p className="text-xl font-medium mt-2 capitalize drop-shadow">
          {currentWeather.condition}
        </p>
        <p className="text-white/80 mt-1">
          Feels like {formatTemperature(currentWeather.feelsLike, unit)}
        </p>
      </div>
    </div>
  );
};
