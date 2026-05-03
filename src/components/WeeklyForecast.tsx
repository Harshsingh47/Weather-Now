import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { formatTemperature, getWeatherIconUrl } from '../utils/formatters';
import { Calendar } from 'lucide-react';

export const WeeklyForecast: React.FC = () => {
  const { dailyForecast, selectedDateIndex, setSelectedDateIndex } = useWeatherStore();
  const { unit } = useSettingsStore();

  if (!dailyForecast || dailyForecast.length === 0) return null;

  return (
    <div className="glass-card p-4 mb-6 text-white">
      <div className="flex items-center gap-2 mb-4 text-white/80 border-b border-white/20 pb-2">
        <Calendar size={16} />
        <h3 className="text-sm font-medium uppercase tracking-wider">5-Day Forecast</h3>
      </div>
      
      <div className="flex flex-col gap-2">
        {dailyForecast.map((day, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedDateIndex(index)}
            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
              selectedDateIndex === index 
                ? 'bg-white/20 shadow-inner border border-white/20' 
                : 'hover:bg-white/10 border border-transparent'
            }`}
          >
            <span className="w-24 text-base font-medium">{index === 0 ? 'Today' : day.date}</span>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.condition}
                className="w-8 h-8"
              />
            </div>
            <div className="flex items-center justify-end gap-3 w-24">
              <span className="text-white/70 font-medium">{formatTemperature(day.minTemp, unit)}</span>
              <span className="text-white font-semibold">{formatTemperature(day.maxTemp, unit)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
