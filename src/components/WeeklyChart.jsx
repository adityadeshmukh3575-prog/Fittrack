import React, { useState } from 'react';
import { Clock, Flame, Calendar } from 'lucide-react';

export default function WeeklyChart({ weeklyData = [] }) {
  const [metric, setMetric] = useState('duration'); // 'duration' | 'calories'

  const maxDuration = Math.max(...weeklyData.map((d) => d.duration), 60);
  const maxCalories = Math.max(...weeklyData.map((d) => d.calories), 500);
  const currentMax = metric === 'duration' ? maxDuration : maxCalories;

  const totalDuration = weeklyData.reduce((acc, d) => acc + (d.duration || 0), 0);
  const totalCalories = weeklyData.reduce((acc, d) => acc + (d.calories || 0), 0);
  const activeDaysCount = weeklyData.filter((d) => d.duration > 0).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Weekly Activity
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              · {activeDaysCount} of 7 days active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mon — Sun training consistency
          </p>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setMetric('duration')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metric === 'duration'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Duration
          </button>
          <button
            onClick={() => setMetric('calories')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metric === 'calories'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Calories
          </button>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-4 pb-2">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-1 border-b border-slate-100 dark:border-slate-800">
          {weeklyData.map((item) => {
            const val = metric === 'duration' ? item.duration : item.calories;
            const heightPercent = currentMax > 0 ? Math.max(val > 0 ? 12 : 4, Math.round((val / currentMax) * 100)) : 4;
            const isRest = val === 0;

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-10 transition-opacity bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg z-20">
                  {item.day}: {isRest ? 'Rest Day' : `${item.duration} min · ${item.calories} kcal`}
                </div>

                {/* Bar Value on top of bar */}
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 tabular-nums group-hover:text-emerald-500 transition-colors">
                  {isRest ? '—' : metric === 'duration' ? `${item.duration}m` : `${item.calories}`}
                </span>

                {/* Visual Bar */}
                <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800/80 rounded-t-lg relative flex items-end overflow-hidden h-32">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ease-out ${
                      isRest
                        ? 'bg-slate-200/60 dark:bg-slate-700/50'
                        : item.isToday
                        ? 'bg-emerald-500 dark:bg-emerald-400 shadow-xs'
                        : 'bg-emerald-600/80 dark:bg-emerald-500/80 hover:bg-emerald-500'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day Label */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-xs block font-medium transition-colors ${
                      item.isToday
                        ? 'font-bold text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Footer */}
      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-4">
          <span>
            Total Time: <strong className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{totalDuration} min</strong>
          </span>
          <span>
            Total Burned: <strong className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{totalCalories} kcal</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
          <span>Completed</span>
          <span className="inline-block w-2.5 h-2.5 rounded-xs bg-slate-200 dark:bg-slate-700 ml-2"></span>
          <span>Rest</span>
        </div>
      </div>
    </div>
  );
}
