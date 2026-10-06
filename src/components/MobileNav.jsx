import React from 'react';
import {
  LayoutDashboard,
  Dumbbell,
  Target,
  TrendingUp,
  Activity,
  Settings
} from 'lucide-react';

export default function MobileNav({ activeTab, setActiveTab }) {
  const items = [
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[50px] ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
