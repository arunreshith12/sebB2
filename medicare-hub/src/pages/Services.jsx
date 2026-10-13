import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES } from '../data/mockData';

export const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const filterServices = currentCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === currentCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold dark:text-white">Our Medical Services</h1>
      <p className="text-gray-500 mb-6">Filter using URL Search Parameters (useSearchParams demonstration)</p>

      {/* Query Filter Buttons */}
      <div className="flex gap-2 mb-8">
        {['all', 'general', 'specialty', 'emergency', 'diagnostics'].map(cat => (
          <button
            key={cat}
            onClick={() => setSearchParams(cat === 'all' ? {} : { category: cat })}
            className={`px-4 py-2 text-sm rounded-lg capitalize ${
              currentCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterServices.map(item => (
          <div key={item.id} className="p-6 border dark:border-gray-800 rounded-xl dark:bg-gray-900">
            <span className="text-xs uppercase font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
              {item.category}
            </span>
            <h3 className="text-xl font-bold dark:text-white mt-3">{item.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};