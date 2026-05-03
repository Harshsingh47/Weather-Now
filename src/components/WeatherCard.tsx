import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { formatTemperature, getWeatherIconUrl } from '../utils/formatters';
import { MapPin } from 'lucide-react';

export const WeatherCard: React.FC = () => {
  const { currentWeather, dailyForecast, selectedDateIndex, setSelectedDateIndex } = useWeatherStore();
  const { unit } = useSettingsStore();

  if (!currentWeather) return null;

  const isToday = selectedDateIndex === 0;
  const forecast = dailyForecast[selectedDateIndex];
  
  const displayData = {
    city: currentWeather.city,
    temperature: isToday ? currentWeather.temperature : forecast.maxTemp,
    feelsLike: isToday ? currentWeather.feelsLike : forecast.minTemp,
    condition: isToday ? currentWeather.condition : forecast.condition,
    icon: isToday ? currentWeather.icon : forecast.icon,
    feelsLikeLabel: isToday ? 'Feels like' : 'Low',
    dateLabel: isToday ? 'Live Local Weather Forecast' : `Forecast for ${forecast.date}`
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-12 text-white">
      <div className="mb-4">
        <select 
          className="bg-black/20 hover:bg-black/30 transition-colors text-white rounded-full px-4 py-1.5 text-sm font-medium appearance-none cursor-pointer outline-none text-center backdrop-blur-md border border-white/20 shadow-sm"
          value={selectedDateIndex}
          onChange={(e) => setSelectedDateIndex(Number(e.target.value))}
        >
          {dailyForecast.map((day, idx) => (
            <option key={idx} value={idx} className="bg-slate-800 text-white">
              {idx === 0 ? `Today, ${day.date}` : day.date}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2 mb-2 bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-md">
        <MapPin size={16} />
        <h2 className="text-lg font-medium">{displayData.city}</h2>
      </div>
      
      <div className="flex flex-col items-center mt-4">
        <img 
          src={getWeatherIconUrl(displayData.icon)} 
          alt={displayData.condition}
          className="w-32 h-32 drop-shadow-lg -mb-4"
        />
        <h1 className="sr-only">{displayData.dateLabel} for {displayData.city}</h1>
        <div className="text-7xl font-light tracking-tighter drop-shadow-md">
          {formatTemperature(displayData.temperature, unit)}
        </div>
        <p className="text-xl font-medium mt-2 capitalize drop-shadow">
          {displayData.condition}
        </p>
        <p className="text-white/80 mt-1">
          {displayData.feelsLikeLabel} {formatTemperature(displayData.feelsLike, unit)}
        </p>
      </div>
    </div>
  );
};
