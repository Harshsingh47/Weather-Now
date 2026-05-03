import React from 'react';
import { SearchBar } from '../components/SearchBar';

export const Search: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 text-white pt-4">
      <h1 className="text-3xl font-light mb-6 text-center drop-shadow-md">Find City</h1>
      <SearchBar />
    </div>
  );
};
