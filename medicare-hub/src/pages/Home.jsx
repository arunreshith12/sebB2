import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, Clock, Award } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-full font-medium">
          24/7 World Class Medical Services
        </span>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
          Your Health, Our <span className="text-blue-600">Top Priority</span>.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore qualified doctors, manage appointments in real time, and experience next-generation healthcare administration.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/appointments" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md">
            Book Appointment
          </Link>
          <Link to="/doctors" className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200">
            View Doctors
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { icon: ShieldCheck, title: "Certified Doctors", desc: "Top specialists verified under global medical boards." },
            { icon: CalendarCheck, title: "Instant Booking", desc: "Interactive appointments with real-time editing & deletion." },
            { icon: Clock, title: "24/7 ER Support", desc: "Always available emergency response care team." },
            { icon: Award, title: "Modern Facilities", desc: "State of the art medical and laboratory equipment." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
              <item.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};