import React, { useState } from 'react';
import Modal from './Modal.jsx';
import { getRelativeDate } from '../data/initialData.js';

const GOAL_TYPES = [
  { label: 'Workout frequency', defaultUnit: 'workouts' },
  { label: 'Weight goal', defaultUnit: 'kg' },
  { label: 'Running distance', defaultUnit: 'km' },
  { label: 'Calories burned', defaultUnit: 'kcal' },
  { label: 'Steps', defaultUnit: 'steps' },
  { label: 'Strength goal', defaultUnit: 'kg' }
];

export default function AddGoalModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Workout frequency');
  const [current, setCurrent] = useState('0');
  const [target, setTarget] = useState('5');
  const [unit, setUnit] = useState('workouts');
  const [deadline, setDeadline] = useState(getRelativeDate(-7)); // 7 days from now
  const [error, setError] = useState('');

  const handleTypeChange = (newType) => {
    setType(newType);
    const found = GOAL_TYPES.find((g) => g.label === newType);
    if (found) {
      setUnit(found.defaultUnit);
      if (newType === 'Steps') {
        setTarget('10000');
        setCurrent('0');
      } else if (newType === 'Calories burned') {
        setTarget('2500');
        setCurrent('0');
      } else if (newType === 'Running distance') {
        setTarget('20');
        setCurrent('0');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a goal title.');
      return;
    }
    const targetNum = Number(target);
    const currNum = Number(current);
    if (isNaN(targetNum) || targetNum <= 0) {
      setError('Please enter a target value greater than 0.');
      return;
    }
    if (isNaN(currNum) || currNum < 0) {
      setError('Current value must be 0 or greater.');
      return;
    }

    onAdd({
      title: title.trim(),
      type,
      current: currNum,
      target: targetNum,
      unit,
      deadline
    });

    // Reset
    setTitle('');
    setType('Workout frequency');
    setCurrent('0');
    setTarget('5');
    setUnit('workouts');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Fitness Goal">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs font-semibold rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Goal Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Complete 5 workouts this week or Run 20 km"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Goal Type
            </label>
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {GOAL_TYPES.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Deadline
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Value *
            </label>
            <input
              type="number"
              step="any"
              min="0.1"
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Value
            </label>
            <input
              type="number"
              step="any"
              min="0"
              required
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Unit
            </label>
            <input
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
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
            Create Goal
          </button>
        </div>
      </form>
    </Modal>
  );
}
