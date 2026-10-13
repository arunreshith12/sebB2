import React from 'react';

export const About = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-extrabold dark:text-white mb-4">About MediCare Hub</h1>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
      MediCare Hub is an integrated digital healthcare facility designed to streamline clinical consults,
      manage hospital visits efficiently, and deliver patient-first medical care across multiple departments.
    </p>
    <div className="grid grid-cols-3 gap-4 border-t border-b py-8 dark:border-gray-800 mt-8">
      <div>
        <p className="text-3xl font-bold text-blue-600">50+</p>
        <p className="text-sm text-gray-500">Certified Specialists</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-blue-600">12k+</p>
        <p className="text-sm text-gray-500">Patients Cared</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-blue-600">99.8%</p>
        <p className="text-sm text-gray-500">Satisfaction Rate</p>
      </div>
    </div>
  </div>
);