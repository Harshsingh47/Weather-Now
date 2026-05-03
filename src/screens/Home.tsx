import React, { useEffect } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { HourlySlider } from '../components/HourlySlider';
import { WeeklyForecast } from '../components/WeeklyForecast';
import { DetailsGrid } from '../components/DetailsGrid';
import { useWeatherStore } from '../store/useWeatherStore';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { currentWeather, isLoading, error, currentLocation, fetchWeather, fetchWeatherByLocation } = useWeatherStore();
  const navigate = useNavigate();
  const hasRequested = React.useRef(false);

  useEffect(() => {
    if (!currentLocation && !isLoading && !currentWeather && !hasRequested.current) {
      hasRequested.current = true;
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.warn('Geolocation denied or failed, defaulting to London', err);
            fetchWeather(51.5074, -0.1278); // Default London
          }
        );
      } else {
        fetchWeather(51.5074, -0.1278); // Default London
      }
    }
  }, [currentLocation, isLoading, currentWeather, fetchWeather, fetchWeatherByLocation]);

  if (!currentWeather && !error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-white">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-lg">Detecting Location & Weather...</p>
      </div>
    );
  }

  if (error && !currentWeather) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-white">
        <p className="text-xl mb-4">Oops! {error}</p>
        <button 
          onClick={() => navigate('/search')}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-full transition-colors"
        >
          Search Location
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <WeatherCard />
      <HourlySlider />
      <WeeklyForecast />
      <DetailsGrid />
    </div>
  );
};
