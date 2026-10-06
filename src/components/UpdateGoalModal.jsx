import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

export default function UpdateGoalModal({ goal, isOpen, onClose, onUpdate }) {
  const [currentVal, setCurrentVal] = useState('');

  useEffect(() => {
    if (goal) {
      setCurrentVal(String(goal.current));
    }
  }, [goal]);

  if (!goal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = Number(currentVal);
    if (isNaN(val) || val < 0) return;
    onUpdate(goal.id, val);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Goal: ${goal.title}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
            Target: <strong>{goal.target} {goal.unit}</strong>
          </span>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            New Current Value ({goal.unit})
          </label>
          <input
            type="number"
            step="any"
            min="0"
            required
            autoFocus
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
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
            Update Progress
          </button>
        </div>
      </form>
    </Modal>
  );
}
