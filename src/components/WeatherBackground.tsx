import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';

export const WeatherBackground: React.FC = () => {
  const { currentWeather, dailyForecast, selectedDateIndex } = useWeatherStore();

  if (!currentWeather) return null;

  const isToday = selectedDateIndex === 0;
  const forecast = dailyForecast[selectedDateIndex];
  
  const condition = (isToday ? currentWeather.condition : forecast?.condition || currentWeather.condition).toLowerCase();
  
  // Render Rain
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
    const isThunderstorm = condition.includes('thunderstorm');
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Thunderstorm flash effect */}
        {isThunderstorm && <div className="absolute inset-0 bg-white/40 animate-lightning opacity-0" />}
        
        {/* Raindrops */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/70 w-[3px] rounded-full animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20 + 10}%`,
              height: `${Math.random() * 30 + 15}px`,
              animationDuration: `${Math.random() * 0.4 + 0.4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Render Snow
  if (condition.includes('snow')) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-snow shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20 + 10}%`,
              width: `${Math.random() * 8 + 6}px`,
              height: `${Math.random() * 8 + 6}px`,
              opacity: Math.random() * 0.5 + 0.5,
              animationDuration: `${Math.random() * 2.5 + 2.5}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Render Clouds
  if (condition.includes('cloud')) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 blur-2xl animate-cloud rounded-full"
            style={{
              left: `${(i * 25) - 20}%`,
              top: `${Math.random() * 40}%`,
              width: `${Math.random() * 400 + 250}px`,
              height: `${Math.random() * 150 + 150}px`,
              animationDuration: `${Math.random() * 20 + 20}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            }}
          />
        ))}
      </div>
    );
  }

  // Render Clear/Sun
  if (condition.includes('clear')) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[5%] -right-[5%] w-[400px] h-[400px] bg-yellow-300/40 blur-[80px] rounded-full animate-pulse-slow" />
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-yellow-400/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
    );
  }

  return null;
};
