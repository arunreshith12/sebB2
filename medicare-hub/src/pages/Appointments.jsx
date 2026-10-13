import React, { useState, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Trash2, Edit2, PlusCircle, CheckCircle } from 'lucide-react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return { ...state, [action.field]: action.value };
    case 'SET_FORM':
      return { ...action.payload };
    case 'RESET':
      return { patientName: '', doctor: '', date: '', notes: '' };
    default:
      return state;
  }
};

export const Appointments = () => {
  // CRUD Data State in LocalStorage via custom hook
  const [appointments, setAppointments] = useLocalStorage('appointments_data', [
    { id: '1', patientName: 'John Doe', doctor: 'Dr. Sarah Jenkins', date: '2026-10-20', notes: 'Routine checkup' }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, dispatchForm] = useReducer(formReducer, {
    patientName: '',
    doctor: '',
    date: '',
    notes: ''
  });

  const validate = () => {
    const errs = {};
    if (!formData.patientName.trim()) errs.patientName = 'Patient name is required';
    if (!formData.doctor.trim()) errs.doctor = 'Please select a doctor';
    if (!formData.date) errs.date = 'Appointment date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      // UPDATE Operation
      setAppointments(prev =>
        prev.map(item => (item.id === editingId ? { ...formData, id: editingId } : item))
      );
      setEditingId(null);
    } else {
      // CREATE Operation
      const newAppt = { ...formData, id: Date.now().toString() };
      setAppointments(prev => [...prev, newAppt]);
    }
    dispatchForm({ type: 'RESET' });
    setErrors({});
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    dispatchForm({ type: 'SET_FORM', payload: item });
  };

  const handleDelete = (id) => {
    // DELETE Operation
    setAppointments(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold dark:text-white mb-2">Manage Appointments</h1>
      <p className="text-gray-500 mb-8">Demonstrating full Create, Read, Update, and Delete (CRUD) operations.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold dark:text-white mb-4 flex items-center gap-2">
            {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <PlusCircle className="w-5 h-5 text-blue-600" />}
            {editingId ? 'Update Appointment' : 'Book Appointment'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">Patient Name</label>
              <input
                type="text"
                value={formData.patientName}
                onChange={e => dispatchForm({ type: 'FIELD_CHANGE', field: 'patientName', value: e.target.value })}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.patientName && <p className="text-xs text-red-500 mt-1">{errors.patientName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300">Doctor</label>
              <select
                value={formData.doctor}
                onChange={e => dispatchForm({ type: 'FIELD_CHANGE', field: 'doctor', value: e.target.value })}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Cardiology)</option>
                <option value="Dr. Robert Chen">Dr. Robert Chen (Neurology)</option>
                <option value="Dr. Emily Vance">Dr. Emily Vance (Pediatrics)</option>
              </select>
              {errors.doctor && <p className="text-xs text-red-500 mt-1">{errors.doctor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300">Appointment Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={e => dispatchForm({ type: 'FIELD_CHANGE', field: 'date', value: e.target.value })}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300">Notes / Symptoms</label>
              <textarea
                value={formData.notes}
                onChange={e => dispatchForm({ type: 'FIELD_CHANGE', field: 'notes', value: e.target.value })}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {editingId ? 'Update' : 'Schedule'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); dispatchForm({ type: 'RESET' }); }}
                  className="px-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Operations (READ & DELETE) */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold dark:text-white mb-4">Scheduled Appointments ({appointments.length})</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map(item => (
                <div
                  key={item.id}
                  className="p-5 border dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">{item.patientName}</h3>
                    <p className="text-sm font-medium text-blue-600">{item.doctor}</p>
                    <p className="text-xs text-gray-500 mt-1">Date: {item.date}</p>
                    {item.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.notes}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-blue-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};