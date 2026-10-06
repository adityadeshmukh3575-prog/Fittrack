import React from 'react';
import { Target, Calendar, CheckCircle2, Clock, Trash2, Edit3 } from 'lucide-react';
import { LinearProgressBar } from './ProgressBar.jsx';
import { formatFriendlyDate } from '../utils/calculations.js';

export default function GoalCard({ goal, onUpdate, onDelete }) {
  const isCompleted = goal.status === 'Completed' || goal.current >= goal.target;
  const isOverdue = !isCompleted && goal.deadline && new Date(goal.deadline) < new Date(new Date().setHours(0,0,0,0));

  const statusLabel = isCompleted ? 'Completed' : isOverdue ? 'Overdue' : 'In Progress';
  const statusColor = isCompleted
    ? 'text-emerald-600 dark:text-emerald-400'
    : isOverdue
    ? 'text-rose-600 dark:text-rose-400'
    : 'text-amber-600 dark:text-amber-400';

  const progressColor = isCompleted ? 'emerald' : isOverdue ? 'rose' : 'blue';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header with Type & Status */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">{goal.type}</span>
          <div className="flex items-center gap-1.5 font-semibold">
            {isCompleted ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Clock className={`w-3.5 h-3.5 ${statusColor}`} />
            )}
            <span className={statusColor}>{statusLabel}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          {goal.title}
        </h4>

        {/* Progress Bar */}
        <div className="my-2">
          <LinearProgressBar
            current={goal.current}
            target={goal.target}
            unit={goal.unit}
            color={progressColor}
          />
        </div>

        {/* Deadline */}
        {goal.deadline && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Target deadline: {formatFriendlyDate(goal.deadline)}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onUpdate(goal)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Update Progress
        </button>

        <button
          onClick={() => onDelete(goal.id)}
          aria-label={`Delete goal ${goal.title}`}
          title="Delete Goal"
          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
