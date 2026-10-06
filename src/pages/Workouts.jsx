import React, { useState, useMemo } from 'react';
import { useFitness } from '../context/FitnessContext.jsx';
import WorkoutCard from '../components/WorkoutCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Modal from '../components/Modal.jsx';
import { Search, Filter, Plus, Dumbbell, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility', 'Full Body'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['All', '<30 min', '30-45 min', '45+ min'];

export default function Workouts() {
  const { workouts, setWorkouts, startWorkout, setSelectedWorkoutDetails, showToast } = useFitness();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  // Custom Workout Creator Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Strength');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newDuration, setNewDuration] = useState('40');
  const [newCalories, setNewCalories] = useState('360');
  const [newDescription, setNewDescription] = useState('');
  const [customExerciseNames, setCustomExerciseNames] = useState('');

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      // Search
      const matchesSearch =
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        (w.description && w.description.toLowerCase().includes(search.toLowerCase())) ||
        (w.category && w.category.toLowerCase().includes(search.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'All' ||
        (w.category && w.category.toLowerCase() === selectedCategory.toLowerCase());

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        (w.difficulty && w.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

      // Duration
      let matchesDuration = true;
      const dur = Number(w.duration) || 0;
      if (selectedDuration === '<30 min') matchesDuration = dur < 30;
      else if (selectedDuration === '30-45 min') matchesDuration = dur >= 30 && dur <= 45;
      else if (selectedDuration === '45+ min') matchesDuration = dur > 45;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
    });
  }, [workouts, search, selectedCategory, selectedDifficulty, selectedDuration]);

  const handleCreateCustomWorkout = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Parse exercise names separated by comma or newline
    const exerciseList = customExerciseNames
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        sets: 3,
        reps: '10-12 reps',
        restSec: 45,
        muscle: newCategory
      }));

    const finalExercises =
      exerciseList.length > 0
        ? exerciseList
        : [
            { name: `${newTitle} Core Movement`, sets: 4, reps: '10 reps', restSec: 60, muscle: newCategory },
            { name: `${newTitle} Secondary Movement`, sets: 3, reps: '12 reps', restSec: 45, muscle: newCategory }
          ];

    const newWorkout = {
      id: `workout-custom-${Date.now()}`,
      name: newTitle.trim(),
      category: newCategory,
      difficulty: newDifficulty,
      duration: Number(newDuration) || 40,
      calories: Number(newCalories) || 350,
      description: newDescription.trim() || `Custom ${newCategory} routine built in FitTrack.`,
      exercises: finalExercises
    };

    setWorkouts((prev) => [newWorkout, ...prev]);
    setIsCreateOpen(false);
    // Reset
    setNewTitle('');
    setNewDescription('');
    setCustomExerciseNames('');
    showToast(`Workout "${newWorkout.name}" created! Ready to train.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & New Workout Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Workout Library
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select a verified training template or launch a session right away
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom Workout</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search workouts by name, category, or focus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Rows */}
        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
          {/* Categories Segmented */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-slate-400 font-medium shrink-0 mr-1">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-semibold rounded-lg shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty & Duration Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Duration:</span>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {DURATIONS.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {(search || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedDuration !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedDuration('All');
              }}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Workouts Grid */}
      {filteredWorkouts.length === 0 ? (
        <EmptyState
          title="No workouts match your filters"
          description="Try broadening your search term or reset the category and duration filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setSelectedCategory('All');
            setSelectedDifficulty('All');
            setSelectedDuration('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onStart={startWorkout}
              onViewDetails={setSelectedWorkoutDetails}
            />
          ))}
        </div>
      )}

      {/* Create Custom Workout Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Custom Workout">
        <form onSubmit={handleCreateCustomWorkout} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Workout Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Posterior Power or Explosive Cardio"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Difficulty
              </label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {DIFFICULTIES.filter((d) => d !== 'All').map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Duration (min)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                required
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Calories Estimate (kcal)
              </label>
              <input
                type="number"
                min="20"
                max="3000"
                required
                value={newCalories}
                onChange={(e) => setNewCalories(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Included Exercises (comma or newline separated)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Barbell Deadlift, Pull-Ups, Dumbbell Shoulder Press, Plank"
              value={customExerciseNames}
              onChange={(e) => setCustomExerciseNames(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
            >
              Save Workout Template
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
