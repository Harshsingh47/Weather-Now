import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { formatTemperature, getWeatherIconUrl } from '../utils/formatters';
import { Clock } from 'lucide-react';

export const HourlySlider: React.FC = () => {
  const { hourlyForecast, dailyForecast, selectedDateIndex } = useWeatherStore();
  const { unit } = useSettingsStore();

  if (!hourlyForecast || hourlyForecast.length === 0) return null;

  const isToday = selectedDateIndex === 0;
  const filteredHourly = isToday 
    ? hourlyForecast.slice(0, 8) 
    : hourlyForecast.filter(h => h.dateStr === dailyForecast[selectedDateIndex]?.rawDate);

  if (filteredHourly.length === 0) return null;

  return (
    <div className="glass-card p-4 mb-6 text-white">
      <div className="flex items-center gap-2 mb-4 text-white/80 border-b border-white/20 pb-2">
        <Clock size={16} />
        <h3 className="text-sm font-medium uppercase tracking-wider">Hourly Forecast</h3>
      </div>
      
      <div className="flex overflow-x-auto no-scrollbar gap-6 pb-2 justify-between md:justify-around">
        {filteredHourly.map((hour, index) => (
          <div key={index} className="flex flex-col items-center min-w-[60px]">
            <span className="text-sm font-medium">{isToday && index === 0 ? 'Now' : hour.time}</span>
            <img 
              src={getWeatherIconUrl(hour.icon)} 
              alt={hour.condition}
              className="w-12 h-12 my-1"
            />
            <span className="text-lg font-semibold">{formatTemperature(hour.temperature, unit)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
