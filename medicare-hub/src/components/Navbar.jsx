import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from 'react-redux';
import { Heart, Sun, Moon, Cross } from 'lucide-react';

export const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const favorites = useSelector(state => state.favorites.doctorIds);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium text-sm transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Cross className="w-5 h-5 rotate-45" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">MediCare Hub</span>
          </Link>

          <div className="hidden md:flex space-x-4 items-center">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/doctors" className={navLinkClass}>Doctors</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/appointments" className={navLinkClass}>Appointments (CRUD)</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 dark:bg-red-950/30 rounded-full">
              <Heart className="w-4 h-4 mr-1 fill-red-500" />
              <span>{favorites.length} Saved</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};