import React, { useState } from 'react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold dark:text-white mb-4">Get in Touch</h1>
      <p className="text-gray-500 mb-6">Need help or have inquiries? Fill out the form below.</p>

      {submitted ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">
          Thank you! Your message has been received. Our team will contact you shortly.
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
          <div>
            <label className="block text-sm dark:text-gray-300">Email Address</label>
            <input required type="email" className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm dark:text-gray-300">Message</label>
            <textarea required rows={4} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};