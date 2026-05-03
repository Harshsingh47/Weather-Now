import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { Droplets, Wind, Gauge, Eye, Sun } from 'lucide-react';

export const DetailsGrid: React.FC = () => {
  const { currentWeather } = useWeatherStore();

  if (!currentWeather) return null;

  const details = [
    { icon: <Droplets size={24} />, label: 'Humidity', value: `${currentWeather.humidity}%` },
    { icon: <Wind size={24} />, label: 'Wind', value: `${currentWeather.windSpeed} km/h` },
    { icon: <Gauge size={24} />, label: 'Pressure', value: `${currentWeather.pressure} hPa` },
    { icon: <Eye size={24} />, label: 'Visibility', value: `${(currentWeather.visibility / 1000).toFixed(1)} km` },
    { icon: <Sun size={24} />, label: 'UV Index', value: currentWeather.uvIndex.toString() },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
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
