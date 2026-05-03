import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useWeatherStore } from '../store/useWeatherStore';
import { useNavigate } from 'react-router-dom';
import { Trash2, MapPin } from 'lucide-react';
import type { CitySuggestion } from '../types';

export const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useSettingsStore();
  const { setCurrentLocation, fetchWeather, currentLocation } = useWeatherStore();
  const navigate = useNavigate();

  const handleSelect = async (city: CitySuggestion) => {
    setCurrentLocation(city);
    navigate('/');
    await fetchWeather(city.lat, city.lon);
  };

  const { addFavorite } = useSettingsStore();

  const isCurrentFavorite = currentLocation ? favorites.some(f => f.name === currentLocation.name) : false;

  return (
    <div className="animate-in fade-in duration-500 text-white pt-4">
      <h1 className="text-3xl font-light mb-6 text-center drop-shadow-md">Favorites</h1>
      
      {currentLocation && !isCurrentFavorite && (
        <button 
          onClick={() => addFavorite(currentLocation)}
          className="w-full glass-card p-4 flex items-center justify-center gap-2 hover:bg-white/30 transition-colors mb-6"
        >
          <MapPin size={20} />
          <span>Save Current Location</span>
        </button>
      )}

      {favorites.length === 0 ? (
        <div className="text-center text-white/70 mt-10">
          <p>No saved cities yet.</p>
          <button 
            onClick={() => navigate('/search')}
            className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-full transition-colors text-white"
          >
            Search Location
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {favorites.map((city, idx) => (
            <div key={idx} className="glass-card p-4 flex items-center justify-between group">
              <div 
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => handleSelect(city)}
              >
                <MapPin size={20} className="text-white/80" />
                <div>
                  <p className="font-medium text-lg">{city.name}</p>
                  <p className="text-sm text-white/70">{city.country}</p>
                </div>
              </div>
              <button 
                onClick={() => removeFavorite(city.name)}
                className="p-2 text-white/60 hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
