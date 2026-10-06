import React from 'react';
import { Dumbbell, Plus } from 'lucide-react';

export default function EmptyState({
  title = 'No records found',
  description = 'Try adjusting your search filters or start logging your fitness activities.',
  actionLabel,
  onAction,
  icon: Icon = Dumbbell
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
