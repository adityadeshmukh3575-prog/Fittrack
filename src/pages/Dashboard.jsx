import React from 'react';
import { useFitness } from '../context/FitnessContext.jsx';
import StatCard from '../components/StatCard.jsx';
import { CircularProgress, LinearProgressBar } from '../components/ProgressBar.jsx';
import WeeklyChart from '../components/WeeklyChart.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatFriendlyDate } from '../utils/calculations.js';
import {
  Dumbbell,
  Flame,
  Zap,
  Target,
  Play,
  Plus,
  TrendingUp,
  Footprints,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const {
    userProfile,
    dashboardStats,
    weeklyActivity,
    currentStreak,
    history,
    workouts,
    startWorkout,
    setActiveTab,
    setOpenManualLogModal,
    setOpenAddGoalModal,
    setSelectedWorkoutDetails
  } = useFitness();

  const currentDateLong = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Recent 4 workouts
  const recentWorkouts = history.slice(0, 4);

  // Quick workout suggestion (first template or preferred category)
  const suggestedWorkout = workouts.find((w) => w.category === userProfile.preferredWorkout) || workouts[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Hero Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {currentDateLong}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Good morning, {userProfile.name || 'Aditya'}! 👋
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ready to crush your goals today?
          </p>
        </div>

        {/* Quick Start Suggested Workout Banner */}
        {suggestedWorkout && (
          <button
            onClick={() => startWorkout(suggestedWorkout)}
            className="self-start md:self-auto inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Play className="w-4 h-4 fill-current text-emerald-400 dark:text-white" />
            <span>Launch Today's Workout: <strong>{suggestedWorkout.name}</strong></span>
          </button>
        )}
      </div>

      {/* 2. Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Workout */}
        <StatCard
          title="Today's Workout"
          value={dashboardStats.todayWorkoutSummary.name}
          subvalue={dashboardStats.todayWorkoutSummary.duration}
          icon={Dumbbell}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
          badgeText="Active"
          onClick={() => setActiveTab('workouts')}
        />

        {/* Calories Burned */}
        <StatCard
          title="Calories Burned"
          value={`${dashboardStats.todayCalories.toLocaleString()} kcal`}
          subvalue="Target: 2,500 kcal daily"
          icon={Flame}
          iconColor="text-amber-500"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
          onClick={() => setActiveTab('progress')}
        />

        {/* Workout Streak */}
        <StatCard
          title="Workout Streak"
          value={`${currentStreak} days`}
          subvalue={`Best: ${dashboardStats.bestStreak} days`}
          icon={Zap}
          iconColor="text-orange-500"
          iconBg="bg-orange-50 dark:bg-orange-950/40"
          badgeText="🔥 On Fire"
          onClick={() => setActiveTab('progress')}
        />

        {/* Weekly Goal */}
        <StatCard
          title="Weekly Goal"
          value={`${dashboardStats.weeklyWorkoutsCount} / ${dashboardStats.weeklyGoalTarget} workouts`}
          subvalue={`${Math.max(0, dashboardStats.weeklyGoalTarget - dashboardStats.weeklyWorkoutsCount)} workouts to target`}
          icon={Target}
          iconColor="text-sky-500"
          iconBg="bg-sky-50 dark:bg-sky-950/40"
          onClick={() => setActiveTab('goals')}
        />
      </div>

      {/* 3. Today's Progress Rings & Visual Overview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Today's Daily Progress
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time synchronization across training volume, calorie expenditure, and daily steps
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 self-start sm:self-auto">
            Updated just now
          </span>
        </div>

        {/* Circular Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          {/* Workout Progress */}
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <CircularProgress
              current={dashboardStats.weeklyWorkoutsCount}
              target={dashboardStats.weeklyGoalTarget}
              size={110}
              strokeWidth={9}
              color="#10b981"
              label="Workouts Progress"
              sublabel={`${dashboardStats.weeklyWorkoutsCount} of ${dashboardStats.weeklyGoalTarget} completed`}
            />
          </div>

          {/* Calories Progress */}
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <CircularProgress
              current={dashboardStats.todayCalories}
              target={userProfile.dailyCalorieTarget || 2500}
              size={110}
              strokeWidth={9}
              color="#f59e0b"
              label="Active Calories"
              sublabel={`${dashboardStats.todayCalories.toLocaleString()} / ${(userProfile.dailyCalorieTarget || 2500).toLocaleString()} kcal`}
            />
          </div>

          {/* Steps Progress */}
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <CircularProgress
              current={userProfile.todaySteps || 7420}
              target={userProfile.dailyStepGoal || 10000}
              size={110}
              strokeWidth={9}
              color="#0284c7"
              label="Daily Steps"
              sublabel={`${(userProfile.todaySteps || 7420).toLocaleString()} / ${(userProfile.dailyStepGoal || 10000).toLocaleString()}`}
            />
          </div>
        </div>

        {/* Linear progress breakdown below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Weekly Workouts Target</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                {dashboardStats.weeklyWorkoutsCount} of {dashboardStats.weeklyGoalTarget}
              </span>
            </div>
            <LinearProgressBar
              current={dashboardStats.weeklyWorkoutsCount}
              target={dashboardStats.weeklyGoalTarget}
              showLabel={false}
              color="emerald"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Calorie Burn Target</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                {dashboardStats.todayCalories} / 2,500 kcal
              </span>
            </div>
            <LinearProgressBar
              current={dashboardStats.todayCalories}
              target={2500}
              showLabel={false}
              color="amber"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Daily Step Goal</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                {userProfile.todaySteps || 7420} / 10,000
              </span>
            </div>
            <LinearProgressBar
              current={userProfile.todaySteps || 7420}
              target={10000}
              showLabel={false}
              color="blue"
            />
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('workouts')}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-800 dark:text-slate-200 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs font-bold">Start Workout</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Browse templates</span>
          </button>

          <button
            onClick={() => setOpenManualLogModal(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-800 dark:text-slate-200 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Log Workout</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Record manually</span>
          </button>

          <button
            onClick={() => setOpenAddGoalModal(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-800 dark:text-slate-200 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Add Goal</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Set milestones</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-800 dark:text-slate-200 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">View Progress</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Records & charts</span>
          </button>
        </div>
      </div>

      {/* 5. Weekly Activity Chart */}
      <WeeklyChart weeklyData={weeklyActivity} />

      {/* 6. Recent Workouts Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Recent Workouts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your latest recorded training sessions
            </p>
          </div>
          <button
            onClick={() => setActiveTab('activity')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
          >
            <span>View All Activity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentWorkouts.length === 0 ? (
          <EmptyState
            title="No workouts recorded yet"
            description="Start your first workout or log a completed session to populate your history."
            actionLabel="Start Workout"
            onAction={() => setActiveTab('workouts')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentWorkouts.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedWorkoutDetails(item)}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.type}</span>
                    <span className="tabular-nums">{formatFriendlyDate(item.date)}</span>
                  </div>

                  <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="tabular-nums">{item.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span className="tabular-nums">{item.calories} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.status || 'Completed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
