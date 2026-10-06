import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext.jsx';
import {
  User,
  Moon,
  Sun,
  Save,
  RotateCcw,
  Download,
  ShieldCheck,
  Target,
  Sparkles
} from 'lucide-react';

export default function Settings() {
  const {
    userProfile,
    updateUserProfile,
    theme,
    toggleTheme,
    handleResetToDefaults,
    workouts,
    history,
    goals,
    showToast
  } = useFitness();

  const [name, setName] = useState(userProfile.name || 'Aditya');
  const [fitnessGoal, setFitnessGoal] = useState(userProfile.fitnessGoal || 'Build Muscle & Endurance');
  const [preferredWorkout, setPreferredWorkout] = useState(userProfile.preferredWorkout || 'Strength');
  const [dailyStepGoal, setDailyStepGoal] = useState(String(userProfile.dailyStepGoal || 10000));
  const [weeklyWorkoutGoal, setWeeklyWorkoutGoal] = useState(String(userProfile.weeklyWorkoutGoal || 5));
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState(String(userProfile.dailyCalorieTarget || 2500));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || 'Aditya',
      fitnessGoal: fitnessGoal.trim(),
      preferredWorkout,
      dailyStepGoal: Number(dailyStepGoal) || 10000,
      weeklyWorkoutGoal: Number(weeklyWorkoutGoal) || 5,
      dailyCalorieTarget: Number(dailyCalorieTarget) || 2500
    });
  };

  const handleExportData = () => {
    const dataPackage = {
      userProfile,
      workouts,
      history,
      goals,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataPackage, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fittrack_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Fitness data exported successfully! 💾');
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Profile & Preferences
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure your personal training targets, theme aesthetics, and local data
        </p>
      </div>

      {/* 1. Theme Configuration */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
          Interface Theme
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Choose between daylight crisp or high-contrast midnight mode
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              if (theme !== 'light') toggleTheme();
            }}
            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
              theme === 'light'
                ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="p-2 rounded-lg bg-white shadow-xs text-amber-500">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
                Light Theme
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Clean off-white background with strong readability
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (theme !== 'dark') toggleTheme();
            }}
            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
              theme === 'dark'
                ? 'border-emerald-500 bg-emerald-950/30 ring-2 ring-emerald-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="p-2 rounded-lg bg-slate-800 text-sky-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
                Dark Theme
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Deep slate palette with optical contrast compensation
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Personal Fitness Profile Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
          Athlete Profile & Targets
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          These settings directly calibrate your dashboard progress rings and calculations
        </p>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name / Nickname *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Fitness Objective
              </label>
              <input
                type="text"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                placeholder="e.g. Hypertrophy, 10K Marathon, Fat Loss"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Workout Style
              </label>
              <select
                value={preferredWorkout}
                onChange={(e) => setPreferredWorkout(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Strength">Strength Training</option>
                <option value="Cardio">Cardio & Running</option>
                <option value="HIIT">High-Intensity Intervals (HIIT)</option>
                <option value="Yoga">Yoga & Flexibility</option>
                <option value="Mobility">Mobility & Joint Health</option>
                <option value="Full Body">Full Body Calisthenics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Weekly Workout Goal (Sessions)
              </label>
              <input
                type="number"
                min="1"
                max="14"
                required
                value={weeklyWorkoutGoal}
                onChange={(e) => setWeeklyWorkoutGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Step Target
              </label>
              <input
                type="number"
                min="1000"
                max="50000"
                step="500"
                required
                value={dailyStepGoal}
                onChange={(e) => setDailyStepGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Active Calorie Target (kcal)
              </label>
              <input
                type="number"
                min="500"
                max="8000"
                step="50"
                required
                value={dailyCalorieTarget}
                onChange={(e) => setDailyCalorieTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Data Storage & Management */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
          Local Storage & Data Management
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          All data is persistently saved in your browser's localStorage without server dependencies
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Data as JSON</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all workouts, history, and goals to the initial rich sample data?')) {
                handleResetToDefaults();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Sample Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
