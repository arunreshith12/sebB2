import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DoctorsLayout, DoctorList } from './pages/Doctors';
import { Appointments } from './pages/Appointments';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* NESTED ROUTING IMPLEMENTATION */}
            <Route path="/doctors" element={<DoctorsLayout />}>
              <Route index element={<DoctorList />} />
              <Route path="cardiology" element={<DoctorList filterDept="cardiology" />} />
              <Route path="neurology" element={<DoctorList filterDept="neurology" />} />
              <Route path="pediatrics" element={<DoctorList filterDept="pediatrics" />} />
            </Route>

            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="p-12 text-center">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}