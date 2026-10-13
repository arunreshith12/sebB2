import React, { useRef } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { DOCTORS } from '../data/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/store';
import { Heart, Search } from 'lucide-react';

export const DoctorsLayout = () => {
  const searchInputRef = useRef(null);

  const focusSearch = () => {
    // Demonstration of useRef for DOM focus
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const navClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-lg ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Our Specialists</h1>
          <p className="text-gray-500 dark:text-gray-400">Explore medical specialists across hospital departments.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={searchInputRef}
            placeholder="Search doctors..."
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            onClick={focusSearch}
            className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-1 text-sm font-medium"
          >
            <Search className="w-4 h-4" /> Focus
          </button>
        </div>
      </div>

      {/* Sub-navigation for Nested Routes */}
      <div className="flex gap-3 mb-8 border-b pb-4 dark:border-gray-800 overflow-x-auto">
        <NavLink to="/doctors" end className={navClass}>All Doctors</NavLink>
        <NavLink to="/doctors/cardiology" className={navClass}>Cardiology</NavLink>
        <NavLink to="/doctors/neurology" className={navClass}>Neurology</NavLink>
        <NavLink to="/doctors/pediatrics" className={navClass}>Pediatrics</NavLink>
      </div>

      {/* Outlet renders the nested child view */}
      <Outlet />
    </div>
  );
};

export const DoctorList = ({ filterDept }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.doctorIds);

  const filtered = filterDept
    ? DOCTORS.filter(d => d.department === filterDept)
    : DOCTORS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map(doc => {
        const isFav = favoriteIds.includes(doc.id);
        return (
          <div key={doc.id} className="border dark:border-gray-800 rounded-xl overflow-hidden shadow-sm dark:bg-gray-900">
            <img src={doc.image} alt={doc.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{doc.name}</h3>
                  <p className="text-blue-600 text-sm font-medium">{doc.specialty}</p>
                </div>
                <button
                  onClick={() => dispatch(toggleFavorite(doc.id))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Exp: {doc.experience}</span>
                <span>⭐ {doc.rating}</span>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${doc.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {doc.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};