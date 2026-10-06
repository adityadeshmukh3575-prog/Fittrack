import React from 'react';

export function LinearProgressBar({
  current = 0,
  target = 100,
  unit = '',
  showLabel = true,
  color = 'emerald',
  height = 'h-2.5'
}) {
  const percentage = Math.min(100, Math.max(0, target > 0 ? Math.round((current / target) * 100) : 0));

  const colorClasses = {
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    blue: 'bg-sky-500 dark:bg-sky-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    rose: 'bg-rose-500 dark:bg-rose-400'
  }[color] || 'bg-emerald-500';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          <span className="text-slate-600 dark:text-slate-400">
            {typeof current === 'number' ? current.toLocaleString() : current}
            {unit ? ` ${unit}` : ''} / {typeof target === 'number' ? target.toLocaleString() : target}
            {unit ? ` ${unit}` : ''}
          </span>
          <span className="tabular-nums font-semibold text-slate-800 dark:text-slate-200">
            {percentage}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${colorClasses} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export function CircularProgress({
  current = 0,
  target = 100,
  size = 110,
  strokeWidth = 10,
  label,
  sublabel,
  color = '#10b981'
}) {
  const percentage = Math.min(100, Math.max(0, target > 0 ? Math.round((current / target) * 100) : 0));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
            {percentage}%
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          {sublabel}
        </span>
      )}
    </div>
  );
}
