import React from 'react';
import {
  LayoutDashboard,
  Dumbbell,
  Target,
  TrendingUp,
  Activity,
  Settings,
  Flame,
  Sun,
  Moon,
  Plus
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentStreak,
  theme,
  toggleTheme,
  onOpenLogModal,
  userName
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Zone */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            🏃
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              FitTrack
            </h1>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 leading-tight">
              Train Smarter. Get Stronger.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Button in Sidebar */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={onOpenLogModal}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="w-4 h-4" />
          Log Workout
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isActive
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                }`}
              />
              <span className="truncate">{item.label}</span>
              {item.id === 'progress' && currentStreak > 0 && (
                <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-amber-500">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span className="tabular-nums">{currentStreak}</span>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Streak Callout Box */}
      <div className="p-4 mx-3 mb-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-amber-500 fill-current" />
          <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
            {currentStreak} Day Streak 🔥
          </span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
          Keep logging workouts daily to maintain your momentum!
        </p>
      </div>

      {/* User & Theme Toggle Footer */}
      <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200 shrink-0">
            {userName ? userName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="truncate">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block truncate">
              {userName || 'Aditya'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
              Active Athlete
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
