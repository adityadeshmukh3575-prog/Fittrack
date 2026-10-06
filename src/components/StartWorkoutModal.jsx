import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  CheckCircle2,
  Clock,
  Flame,
  RotateCcw,
  Plus,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatDuration } from '../utils/calculations.js';

export default function StartWorkoutModal({ session, onFinish, onCancel }) {
  if (!session) return null;

  // Session elapsed timer
  const [elapsedSeconds, setElapsedSeconds] = useState(session.elapsedSeconds || 0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(session.currentExerciseIndex || 0);
  const [completedSets, setCompletedSets] = useState({}); // { [exIdx]: Set<number> }
  const [isFinishedCelebration, setIsFinishedCelebration] = useState(false);
  const [notes, setNotes] = useState('');

  // Rest Timer state
  const [restTimerSeconds, setRestTimerSeconds] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);

  const exercises = session.exercises || [];
  const currentExercise = exercises[currentIdx] || {
    name: 'General Exercise',
    sets: 3,
    reps: '12 reps',
    restSec: 60,
    muscle: 'Full Body'
  };

  // Workout live duration clock
  useEffect(() => {
    let interval = null;
    if (!isPaused && !isFinishedCelebration) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isFinishedCelebration]);

  // Rest countdown timer
  useEffect(() => {
    let timer = null;
    if (isRestActive && restTimerSeconds > 0) {
      timer = setInterval(() => {
        setRestTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsRestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRestActive, restTimerSeconds]);

  // Format MM:SS for digital timers
  const formatTimerDigits = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleSet = (setNumber) => {
    setCompletedSets((prev) => {
      const currentSetForEx = new Set(prev[currentIdx] || []);
      if (currentSetForEx.has(setNumber)) {
        currentSetForEx.delete(setNumber);
      } else {
        currentSetForEx.add(setNumber);
        // Automatically start rest timer if not finished
        const restSec = currentExercise.restSec || 45;
        if (restSec > 0) {
          setRestTimerSeconds(restSec);
          setIsRestActive(true);
        }
      }
      return {
        ...prev,
        [currentIdx]: currentSetForEx
      };
    });
  };

  const handleCompleteExercise = () => {
    // Mark all sets completed for current exercise
    const allSets = new Set(Array.from({ length: currentExercise.sets || 3 }, (_, i) => i + 1));
    setCompletedSets((prev) => ({
      ...prev,
      [currentIdx]: allSets
    }));

    if (currentIdx < exercises.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setIsRestActive(false);
      setRestTimerSeconds(0);
    } else {
      // Reached the end!
      handleTriggerFinish();
    }
  };

  const handleSkipExercise = () => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setIsRestActive(false);
      setRestTimerSeconds(0);
    } else {
      handleTriggerFinish();
    }
  };

  const handleTriggerFinish = () => {
    setIsFinishedCelebration(true);
    setIsRestActive(false);
  };

  const handleConfirmSave = () => {
    const finalSession = {
      ...session,
      elapsedSeconds,
      notes: notes.trim(),
      exercisesCompleted: exercises.length
    };
    onFinish(finalSession);
  };

  const durationMin = Math.max(1, Math.round(elapsedSeconds / 60));
  const estimatedCaloriesBurned = Math.round(
    (session.estimatedCalories || 380) * Math.min(2, Math.max(0.6, durationMin / (session.estimatedDuration || 30)))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => {}} />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 my-4 text-slate-900 dark:text-slate-100 overflow-hidden">
        {/* If Celebration screen */}
        {isFinishedCelebration ? (
          <div className="py-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Workout Complete! 🎉
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Great job pushing through your <strong className="text-slate-800 dark:text-slate-200">{session.name}</strong> session! Your stats have been updated.
            </p>

            {/* Metrics Recap */}
            <div className="grid grid-cols-3 gap-3 my-6 max-w-md mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Time
                </span>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                  {formatDuration(durationMin)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Burned
                </span>
                <p className="text-lg font-bold text-amber-500 tabular-nums mt-0.5">
                  {estimatedCaloriesBurned} kcal
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Exercises
                </span>
                <p className="text-lg font-bold text-emerald-500 tabular-nums mt-0.5">
                  {exercises.length}
                </p>
              </div>
            </div>

            {/* Optional Workout Notes */}
            <div className="max-w-md mx-auto mb-6 text-left">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Workout Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did it feel? Any personal records or adjustments?"
                rows={2}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleConfirmSave}
                className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Save & Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Active Workout Session Interface */
          <div>
            {/* Top Bar: Title & Session Clock */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Active Session
                </span>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {session.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Elapsed Stopwatch */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{formatTimerDigits(elapsedSeconds)}</span>
                </div>

                <button
                  onClick={onCancel}
                  aria-label="Exit Workout Session"
                  title="Quit Workout"
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Overall Progress Step Bar */}
            <div className="mt-4 mb-6">
              <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                <span>
                  Exercise {currentIdx + 1} of {exercises.length}
                </span>
                <span className="tabular-nums">
                  {Math.round(((currentIdx + 1) / exercises.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / exercises.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Exercise Spotlight Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Current Exercise
                  </span>
                  <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-0.5">
                    {currentExercise.name}
                  </h4>
                  {currentExercise.muscle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Focus: {currentExercise.muscle}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                    Target
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {currentExercise.sets || 3} Sets × {currentExercise.reps || '10 reps'}
                  </span>
                </div>
              </div>

              {/* Sets Checklist */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Sets Checklist (Tap to complete set)
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: currentExercise.sets || 3 }, (_, i) => i + 1).map((setNum) => {
                    const isDone = (completedSets[currentIdx] || new Set()).has(setNum);
                    return (
                      <button
                        key={setNum}
                        onClick={() => handleToggleSet(setNum)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isDone ? 'text-white' : 'text-slate-400'}`} />
                        Set {setNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Built-in Rest Timer Display */}
              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                    Rest Timer
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatTimerDigits(restTimerSeconds)}
                    </span>
                    {isRestActive && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
                        RESTING
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (restTimerSeconds === 0) setRestTimerSeconds(currentExercise.restSec || 45);
                      setIsRestActive(!isRestActive);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    {isRestActive ? 'Pause Rest' : 'Start Rest'}
                  </button>
                  <button
                    onClick={() => setRestTimerSeconds((prev) => prev + 15)}
                    className="p-1 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
                    title="+15 seconds"
                  >
                    +15s
                  </button>
                  <button
                    onClick={() => {
                      setIsRestActive(false);
                      setRestTimerSeconds(0);
                    }}
                    className="p-1 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
                    title="Skip Rest"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation & Exercise Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Pause Workout Session */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>

                {/* Skip Exercise */}
                <button
                  onClick={handleSkipExercise}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  Skip
                </button>

                {/* Finish Workout Early */}
                <button
                  onClick={handleTriggerFinish}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  Finish Early
                </button>
              </div>

              {/* Primary: Complete Exercise */}
              <button
                onClick={handleCompleteExercise}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <CheckCircle2 className="w-4 h-4" />
                {currentIdx < exercises.length - 1 ? 'Complete Exercise' : 'Finish Workout'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
