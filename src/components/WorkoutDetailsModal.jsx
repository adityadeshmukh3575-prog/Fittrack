import React from 'react';
import Modal from './Modal.jsx';
import { Clock, Flame, Dumbbell, Play, Layers } from 'lucide-react';

export default function WorkoutDetailsModal({ workout, isOpen, onClose, onStart }) {
  if (!workout) return null;

  const exercises = workout.exercises || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={workout.name} maxWidth="max-w-2xl">
      <div>
        {/* Subhead info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
          <span>{workout.category || workout.type}</span>
          <span aria-hidden="true">·</span>
          <span>{workout.difficulty || 'Intermediate'}</span>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums">{workout.duration} min</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Flame className="w-3.5 h-3.5" />
            <span className="tabular-nums">{workout.calories} kcal</span>
          </div>
        </div>

        {workout.description && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
            {workout.description}
          </p>
        )}

        {workout.notes && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 mb-5">
            <strong>Logged Notes:</strong> {workout.notes}
          </div>
        )}

        {/* Exercises list */}
        {exercises.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Included Exercises ({exercises.length})
            </h4>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {exercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center text-[11px] shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                        {ex.name}
                      </span>
                      {ex.muscle && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Focus: {ex.muscle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block tabular-nums">
                      {ex.sets} sets × {ex.reps}
                    </span>
                    {ex.restSec ? (
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        {ex.restSec}s rest
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action footer */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          {onStart && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onStart(workout);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Workout Now
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
