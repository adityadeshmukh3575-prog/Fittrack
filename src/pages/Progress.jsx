import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext.jsx';
import StatCard from '../components/StatCard.jsx';
import { formatDuration } from '../utils/calculations.js';
import {
  Trophy,
  Flame,
  Clock,
  Zap,
  TrendingUp,
  Award,
  Calendar,
  BarChart2,
  ChevronRight
} from 'lucide-react';

export default function Progress() {
  const { dashboardStats, currentStreak, bestStreak, weeklyActivity, history } = useFitness();
  const [chartView, setChartView] = useState('calories'); // 'calories' | 'duration' | 'workouts'

  const { records } = dashboardStats;

  // Max calculations for clean SVG charts
  const maxCalories = Math.max(...weeklyActivity.map((d) => d.calories), 600);
  const maxDuration = Math.max(...weeklyActivity.map((d) => d.duration), 60);

  // Distribution by workout category
  const categoryCounts = {};
  history.forEach((h) => {
    const cat = h.type || 'Strength';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const totalLogs = history.length || 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Performance & Analytics
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Quantifiable training volume, calorie trends, and historical records
        </p>
      </div>

      {/* 1. Main Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Weekly Workouts"
          value={`${dashboardStats.weeklyWorkoutsCount} sessions`}
          subvalue={`Goal: ${dashboardStats.weeklyGoalTarget} sessions`}
          icon={Calendar}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />

        <StatCard
          title="Total Workout Time"
          value={formatDuration(dashboardStats.totalWorkoutTime)}
          subvalue={`This week: ${formatDuration(dashboardStats.weekWorkoutTime)}`}
          icon={Clock}
          iconColor="text-sky-500"
          iconBg="bg-sky-50 dark:bg-sky-950/40"
        />

        <StatCard
          title="Calories Burned"
          value={`${dashboardStats.totalCalories.toLocaleString()} kcal`}
          subvalue={`This week: ${dashboardStats.weekCalories.toLocaleString()} kcal`}
          icon={Flame}
          iconColor="text-amber-500"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
        />

        <StatCard
          title="Current Streak"
          value={`${currentStreak} days`}
          subvalue="Consecutive training"
          icon={Zap}
          iconColor="text-orange-500"
          iconBg="bg-orange-50 dark:bg-orange-950/40"
          badgeText="Active"
        />

        <StatCard
          title="Best Streak"
          value={`${bestStreak} days`}
          subvalue="All-time personal record"
          icon={Trophy}
          iconColor="text-purple-500"
          iconBg="bg-purple-50 dark:bg-purple-950/40"
        />
      </div>

      {/* 2. Visual Progress Charts */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Weekly Volume Trends
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real session distribution over the current training cycle
            </p>
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setChartView('calories')}
              className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
                chartView === 'calories'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Calories Burned
            </button>
            <button
              onClick={() => setChartView('duration')}
              className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
                chartView === 'duration'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Workout Duration
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        <div className="pt-4 pb-2">
          <div className="h-52 flex items-end justify-between gap-3 px-2 border-b border-slate-100 dark:border-slate-800">
            {weeklyActivity.map((d) => {
              const val = chartView === 'calories' ? d.calories : d.duration;
              const maxVal = chartView === 'calories' ? maxCalories : maxDuration;
              const heightPercent = maxVal > 0 ? Math.max(val > 0 ? 12 : 5, Math.round((val / maxVal) * 100)) : 5;
              const isRest = val === 0;

              return (
                <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-10 transition-opacity bg-slate-900 text-white text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg z-20">
                    {d.day}: {isRest ? 'Rest' : chartView === 'calories' ? `${d.calories} kcal` : `${d.duration} min`}
                  </div>

                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5 tabular-nums">
                    {isRest ? '—' : chartView === 'calories' ? `${d.calories}` : `${d.duration}m`}
                  </span>

                  <div className="w-full max-w-[46px] bg-slate-100 dark:bg-slate-800 rounded-t-xl relative flex items-end overflow-hidden h-36">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ease-out ${
                        isRest
                          ? 'bg-slate-200/50 dark:bg-slate-700/40'
                          : d.isToday
                          ? 'bg-emerald-500 dark:bg-emerald-400'
                          : 'bg-emerald-600 dark:bg-emerald-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span
                    className={`mt-2 text-xs font-semibold ${
                      d.isToday
                        ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Personal Records Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Personal Records
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          High-water marks calculated from your lifetime workout data
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Longest Workout */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Longest Workout
            </span>
            <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums mt-1">
              {records.longestWorkout}
            </p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
              Endurance Milestone
            </span>
          </div>

          {/* Most Calories Burned */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Most Calories Burned
            </span>
            <p className="text-2xl font-bold tracking-tight text-amber-500 tabular-nums mt-1">
              {records.mostCalories}
            </p>
            <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 block font-medium">
              Single-Session Peak
            </span>
          </div>

          {/* Longest Streak */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Longest Streak
            </span>
            <p className="text-2xl font-bold tracking-tight text-orange-500 tabular-nums mt-1">
              {records.longestStreak}
            </p>
            <span className="text-xs text-orange-600 dark:text-orange-400 mt-1 block font-medium">
              Consecutive Consistency
            </span>
          </div>

          {/* Most Workouts in a Week */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Most Workouts in a Week
            </span>
            <p className="text-2xl font-bold tracking-tight text-sky-500 tabular-nums mt-1">
              {records.mostWorkoutsWeek} workouts
            </p>
            <span className="text-xs text-sky-600 dark:text-sky-400 mt-1 block font-medium">
              Maximum Weekly Density
            </span>
          </div>
        </div>
      </div>

      {/* 4. Workout Discipline Distribution */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
          Discipline Distribution
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Proportion of completed workouts by training modality
        </p>

        <div className="space-y-3">
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const pct = Math.round((count / totalLogs) * 100);
            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{cat}</span>
                  <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                    {count} workouts ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
