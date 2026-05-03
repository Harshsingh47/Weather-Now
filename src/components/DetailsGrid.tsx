import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { Droplets, Wind, Gauge, Eye, Sun } from 'lucide-react';

export const DetailsGrid: React.FC = () => {
  const { currentWeather, dailyForecast, selectedDateIndex } = useWeatherStore();

  if (!currentWeather) return null;

  const isToday = selectedDateIndex === 0;
  const forecast = dailyForecast[selectedDateIndex];
  
  const data = {
    humidity: isToday ? currentWeather.humidity : forecast.humidity,
    windSpeed: isToday ? currentWeather.windSpeed : forecast.windSpeed,
    pressure: isToday ? currentWeather.pressure : forecast.pressure,
    visibility: isToday ? currentWeather.visibility : forecast.visibility,
    uvIndex: isToday ? currentWeather.uvIndex : 0, // UV index not available in simplified forecast
  };

  const details = [
    { icon: <Droplets size={24} />, label: 'Humidity', value: `${data.humidity}%` },
    { icon: <Wind size={24} />, label: 'Wind', value: `${data.windSpeed} km/h` },
    { icon: <Gauge size={24} />, label: 'Pressure', value: `${data.pressure} hPa` },
    { icon: <Eye size={24} />, label: 'Visibility', value: `${(data.visibility / 1000).toFixed(1)} km` },
    { icon: <Sun size={24} />, label: 'UV Index', value: data.uvIndex.toString() },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      {details.map((detail, index) => (
        <div key={index} className="glass-card p-4 flex flex-col items-center justify-center text-white text-center gap-2">
          <div className="text-white/80">
            {detail.icon}
          </div>
          <div>
            <p className="text-sm text-white/70 uppercase tracking-wider mb-1">{detail.label}</p>
            <p className="text-xl font-semibold">{detail.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
