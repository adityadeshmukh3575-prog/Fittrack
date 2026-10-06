import React from 'react';
import { Play, Flame, Clock, Layers, ChevronRight, Info } from 'lucide-react';

export default function WorkoutCard({
  workout,
  onStart,
  onViewDetails
}) {
  const exerciseCount = workout.exercises ? workout.exercises.length : (workout.totalExercises || 6);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Unboxed Metadata header */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          <div className="flex items-center gap-1.5">
            <span>{workout.category || workout.type}</span>
            <span aria-hidden="true">·</span>
            <span>{workout.difficulty || 'Intermediate'}</span>
          </div>
          <span className="text-slate-400 tabular-nums">{exerciseCount} exercises</span>
        </div>

        {/* Title */}
        <h4 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {workout.name}
        </h4>

        {/* Description or excerpt */}
        {workout.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 mb-4 leading-relaxed">
            {workout.description}
          </p>
        )}

        {/* Metric strip */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 my-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="tabular-nums">{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span className="tabular-nums">{workout.calories} kcal</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onStart(workout)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Start Workout
        </button>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(workout)}
            title="View Exercise Breakdown"
            aria-label={`View details for ${workout.name}`}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
