import React from 'react';

export default function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  badgeText,
  iconColor = 'text-emerald-500',
  iconBg = 'bg-emerald-50 dark:bg-emerald-950/40',
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-emerald-500/50 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 tabular-nums">
            {value}
          </span>
          {badgeText && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {badgeText}
            </span>
          )}
        </div>
        {subvalue && (
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {subvalue}
          </span>
        )}
      </div>
    </div>
  );
}
