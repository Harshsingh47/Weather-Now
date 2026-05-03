import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

export const Settings: React.FC = () => {
  const { unit, theme, notifications, setUnit, setTheme, setNotifications } = useSettingsStore();

  return (
    <div className="animate-in fade-in duration-500 text-white pt-4">
      <h1 className="text-3xl font-light mb-6 text-center drop-shadow-md">Settings</h1>

      <div className="flex flex-col gap-4">
        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Temperature Unit</p>
            <p className="text-sm text-white/70">Choose Celsius or Fahrenheit</p>
          </div>
          <div className="flex bg-black/20 rounded-lg p-1 backdrop-blur-sm">
            <button 
              className={`px-4 py-1.5 rounded-md transition-all ${unit === 'CELSIUS' ? 'bg-white/30 shadow-sm' : 'hover:bg-white/10'}`}
              onClick={() => setUnit('CELSIUS')}
            >
              °C
            </button>
            <button 
              className={`px-4 py-1.5 rounded-md transition-all ${unit === 'FAHRENHEIT' ? 'bg-white/30 shadow-sm' : 'hover:bg-white/10'}`}
              onClick={() => setUnit('FAHRENHEIT')}
            >
              °F
            </button>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Theme</p>
            <p className="text-sm text-white/70">Light or Dark mode</p>
          </div>
          <div className="flex bg-black/20 rounded-lg p-1 backdrop-blur-sm">
            <button 
              className={`px-4 py-1.5 rounded-md transition-all ${theme === 'LIGHT' ? 'bg-white/30 shadow-sm' : 'hover:bg-white/10'}`}
              onClick={() => setTheme('LIGHT')}
            >
              Light
            </button>
            <button 
              className={`px-4 py-1.5 rounded-md transition-all ${theme === 'DARK' ? 'bg-white/30 shadow-sm' : 'hover:bg-white/10'}`}
              onClick={() => setTheme('DARK')}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Notifications</p>
            <p className="text-sm text-white/70">Daily weather updates</p>
          </div>
          <button 
            className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-green-400' : 'bg-white/30'}`}
            onClick={() => setNotifications(!notifications)}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
