import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';
import { weatherService } from '../services/weatherService';
import type { CitySuggestion } from '../types';
import { useNavigate } from 'react-router-dom';
import { useWeatherStore } from '../store/useWeatherStore';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();
  const { setCurrentLocation, fetchWeather, fetchWeatherByLocation } = useWeatherStore();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        const results = await weatherService.searchCities(query);
        setSuggestions(results);
        setIsSearching(false);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = async (city: CitySuggestion) => {
    setCurrentLocation(city);
    setQuery('');
    setSuggestions([]);
    navigate('/');
    await fetchWeather(city.lat, city.lon);
  };

  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setQuery('');
          setSuggestions([]);
          navigate('/');
          await fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
          setIsLocating(false);
        },
        (err) => {
          console.error('Geolocation failed', err);
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-4">
      <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-white/20 backdrop-blur-md overflow-hidden border border-white/30 text-white">
        <div className="grid place-items-center h-full w-12 text-white/80">
          <Search size={20} />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-white bg-transparent pr-2 placeholder-white/70"
          type="text"
          id="search"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        
        {isSearching ? (
          <div className="grid place-items-center h-full w-12 text-white/80">
             <Loader2 size={20} className="animate-spin" />
          </div>
        ) : (
          <button 
            onClick={handleLocateMe}
            className="grid place-items-center h-full w-12 text-white/80 hover:text-white transition-colors"
            title="Use current location"
            disabled={isLocating}
          >
            {isLocating ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />}
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-14 w-full bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((city, idx) => (
            <div 
              key={idx}
              className="px-4 py-3 cursor-pointer hover:bg-white/20 transition-colors flex items-center gap-3 text-white border-b border-white/10 last:border-0"
              onClick={() => handleSelect(city)}
            >
              <MapPin size={18} className="text-white/70" />
              <div>
                <p className="font-medium text-sm">{city.name}</p>
                <p className="text-xs text-white/70">
                  {city.state ? `${city.state}, ` : ''}{city.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
