import React from 'react';
import { Plus, Sun, Moon, Flame } from 'lucide-react';

export default function Header({
  activeTab,
  userName = 'Aditya',
  currentStreak = 7,
  theme,
  toggleTheme,
  onOpenLogModal
}) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'workouts':
        return 'Workouts Catalog';
      case 'goals':
        return 'Fitness Goals';
      case 'progress':
        return 'Performance & Records';
      case 'activity':
        return 'Activity History';
      case 'settings':
        return 'Profile & Settings';
      default:
        return 'FitTrack';
    }
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Left: Current Section & Date */}
      <div>
        <div className="flex items-center gap-2">
          {/* Mobile brand icon */}
          <span className="md:hidden text-lg" aria-hidden="true">
            🏃
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {getTabLabel()}
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {currentDateFormatted}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Indicator (Header) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-current text-amber-500" />
          <span className="tabular-nums">{currentStreak} day streak</span>
        </div>

        {/* Quick Log Button */}
        <button
          onClick={onOpenLogModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log Workout</span>
          <span className="sm:hidden">Log</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label={`Toggle to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          title={`Toggle to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200 select-none">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
