import React, { useState } from 'react';
import Modal from './Modal.jsx';
import { normalizeDate } from '../utils/calculations.js';
import { Flame, Clock, Calendar, Dumbbell, AlignLeft } from 'lucide-react';

const WORKOUT_TYPES = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility', 'Other'];

export default function LogWorkoutModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Strength');
  const [duration, setDuration] = useState('45');
  const [calories, setCalories] = useState('350');
  const [date, setDate] = useState(normalizeDate(new Date()));
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a workout name.');
      return;
    }
    const durNum = Number(duration);
    const calNum = Number(calories);
    if (isNaN(durNum) || durNum <= 0) {
      setError('Please enter a valid duration in minutes.');
      return;
    }
    if (isNaN(calNum) || calNum < 0) {
      setError('Please enter valid calories burned.');
      return;
    }

    onSave({
      name: name.trim(),
      type,
      duration: durNum,
      calories: calNum,
      date: date || normalizeDate(new Date()),
      notes: notes.trim()
    });

    // Reset fields
    setName('');
    setType('Strength');
    setDuration('45');
    setCalories('350');
    setNotes('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Workout">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs font-semibold rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Workout Name *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="e.g. Upper Body Hypertrophy or 5K Evening Run"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Workout Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {WORKOUT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Duration (minutes) *
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="600"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full pl-3.5 pr-12 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">
                min
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Calories Burned (kcal) *
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="5000"
                required
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full pl-3.5 pr-12 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">
                kcal
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Optional Notes
          </label>
          <textarea
            rows={2}
            placeholder="Focus areas, weights used, or overall feeling..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Save Workout
          </button>
        </div>
      </form>
    </Modal>
  );
}
