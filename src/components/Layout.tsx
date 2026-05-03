import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, Star, Settings } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useWeatherStore } from '../store/useWeatherStore';

export const Layout: React.FC = () => {
  const { theme } = useSettingsStore();
  const { currentWeather } = useWeatherStore();
  const location = useLocation();

  React.useEffect(() => {
    if (theme === 'DARK') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Determine dynamic background
  const getBackground = () => {
    if (!currentWeather) return 'bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-slate-800 dark:to-slate-950';
    const condition = currentWeather.condition.toLowerCase();
    
    if (theme === 'DARK') {
      return 'bg-gradient-to-br from-slate-800 to-slate-950';
    }

    if (condition.includes('clear')) return 'bg-gradient-to-br from-blue-400 to-blue-600';
    if (condition.includes('cloud')) return 'bg-gradient-to-br from-slate-400 to-slate-600';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'bg-gradient-to-br from-blue-600 to-slate-700';
    if (condition.includes('snow')) return 'bg-gradient-to-br from-blue-100 to-white';
    
    return 'bg-gradient-to-br from-blue-400 to-indigo-600';
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${getBackground()}`}>
      <main className="flex-1 overflow-y-auto pb-20 w-full max-w-md mx-auto relative pt-4 px-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/20 dark:border-white/10 pb-safe">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
          <NavItem to="/" icon={<Home size={24} />} active={location.pathname === '/'} label="Home" />
          <NavItem to="/search" icon={<Search size={24} />} active={location.pathname === '/search'} label="Search" />
          <NavItem to="/favorites" icon={<Star size={24} />} active={location.pathname === '/favorites'} label="Favorites" />
          <NavItem to="/settings" icon={<Settings size={24} />} active={location.pathname === '/settings'} label="Settings" />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, active, label }: { to: string; icon: React.ReactNode; active: boolean; label: string }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-white drop-shadow-md' : 'text-white/60 hover:text-white/80'}`}>
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </Link>
);
